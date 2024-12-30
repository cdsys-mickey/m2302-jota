/* eslint-disable no-mixed-spaces-and-tabs */
import D05 from "@/modules/md-d05";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";

export const useD05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "D05",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();

	// const qtyMap = useMemo(() => new Map(), []);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/material/waste-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
			dtype: null,
			customer: null,
			dept: null,
			SAmt: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
	});

	const sqtyManager = useSQtyManager({
		grid,
	});
	const { committed } = sqtyManager;

	const updateAmt = useCallback(
		({ setValue, gridData, reset = false }) => {
			if (reset) {
				setValue("TotAmt_N", "");
			} else {
				// if (formData) {
				// 	setValue("TotAmt_N", formData?.TotAmt_N);
				// 	return;
				// }

				if (gridData) {
					const total = D05.getTotal(gridData);
					console.log("total", total);
					setValue("TotAmt_N", total.toFixed(2));
					return;
				}
				setValue("TotAmt_N", "");
			}
		},
		[]
	);


	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			wdate: new Date(),
			TotAmt_N: "",
			employee: null,
		};
		crud.promptCreating({ data });
		// qtyMap.clear();
		sqtyManager.clearQty();
		grid.initGridData(data.prods, { fillRows: true });
	}, [crud, grid, sqtyManager]);

	// READ
	const loadItem = useCallback(
		async ({ id, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : id;
				if (!refresh) {
					itemIdRef.current = id;
					crud.startReading("讀取中...", { id });
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/material/waste-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = D05.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					await sqtyManager.recoverStockMap(data.prods);

					grid.initGridData(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[httpGetAsync, token, crud, sqtyManager, grid]
	);

	/**
	 * CREATE / UPDATE
	 */
	const handleSave = useCallback(
		async ({ data, setValue, gridMeta }) => {
			const creating = crud.creating;
			try {
				if (creating) {
					crud.startCreating();
				} else {
					crud.startUpdating();
				}

				const { status, error } = creating ? await httpPostAsync({
					url: "v1/material/waste-orders",
					data: data,
					bearer: token,
				}) : await httpPutAsync({
					url: "v1/material/waste-orders",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(creating ? `新增成功` : `修改成功`);
					if (creating) {
						crud.doneCreating();
						crud.cancelReading();
					} else {
						crud.doneUpdating();
						loadItem({ refresh: true });
					}

					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				if (creating) {
					crud.failCreating();
				} else {
					crud.failUpdating();
				}
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err), {
					position: "top-right"
				});
				// if (err.code === 102) {
				// 	const rowIndex = Number(err.data.Row) - 1;
				// 	const rowData = grid.gridData[rowIndex];
				// 	const stock = Number(err.data.StockQty);

				// 	sqtyManager.handleOverrideSQty({
				// 		setValue, gridMeta, formData: data, rowData, rowIndex, stock, submitAfterCommitted: true
				// 	});
				// } else {
				// 	toast.error(Errors.getMessage("新增失敗", err), {
				// 		position: "top-right"
				// 	});
				// }
			}
		},
		[crud, httpPostAsync, httpPutAsync, listLoader, loadItem, token]
	);


	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.報廢單號 });
		},
		[crud, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄修改?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確定要取消編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	// UPDATE
	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/material/waste-orders",
	// 				data: data,
	// 				bearer: token,
	// 			});
	// 			if (status.success) {
	// 				toast.success(`修改成功`);
	// 				crud.doneUpdating();
	// 				//crud.cancelReading();
	// 				loadItem({ refresh: true });
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failUpdating();
	// 			console.error("handleUpdate.failed", err);
	// 			if (err.code === 102) {
	// 				recoverStockMap(data.prods, { mark: true });
	// 				toast.error("部分商品庫存不足，請調整後再送出", {
	// 					position: "top-right"
	// 				});
	// 			} else {
	// 				toast.error(Errors.getMessage("修改失敗", err), {
	// 					position: "top-right"
	// 				});
	// 			}
	// 		}
	// 	},
	// 	[crud, httpPutAsync, listLoader, loadItem, recoverStockMap, token]
	// );

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除報廢單「${itemData?.CxlID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/material/waste-orders`,
						bearer: token,
						params: {
							id: itemData?.CxlID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除報廢單 ${itemData?.CxlID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err), {
						position: "top-right"
					});
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {},
				// });
				reset({
					wdate: null,
					employee: null
				});
			},
		[]
	);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			handlePopperClose();
			listLoader.loadList({
				params: D05.transformAsQueryParams(data),
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const handleGridSQtyChange = useCallback(
		async ({ rowData, rowIndex, gridData, gridMeta }) => {

			let processedRowData = {
				...rowData,
			};

			if (!rowData.SQty) {
				return {
					...processedRowData,
					["SAmt"]: 0,
				};
			}

			const prodStock = sqtyManager.getStockExcludingCurrent({
				rowIndex,
				prodId: rowData.prod.ProdID,
				gridData,
			})

			if (prodStock < rowData.SQty) {
				processedRowData = {
					...rowData,
					["SQty"]: 0,
					["SAmt"]: 0,
				};
				toast.error(`第 ${rowIndex + 1} 筆庫存量不足(${prodStock} < ${rowData.SQty})！`,
					{
						position: "top-right",
					}
				);
				gridMeta.setActiveCell({
					col: "SQty",
					row: rowIndex
				})
				return processedRowData;
			}

			const prodId = rowData?.prod?.ProdID;
			const customerId = rowData?.customer?.CustID || "";
			const deptId = rowData?.dept?.DeptID || "";

			if (prodId && (customerId || deptId)) {
				try {
					const { status, payload, error } = await httpGetAsync({
						url: "v1/material/waste-orders/samt",
						bearer: token,
						params: {
							prdi: rowData?.prod?.ProdID,
							qty: rowData?.SQty || 0,
							csti: customerId,
							depi: deptId,
						},
					});

					if (status.success) {
						console.log("payload", payload);
						const newAmt = (parseFloat(payload["SAmt"]) || 0).toFixed(2);
						processedRowData = {
							...processedRowData,
							["SAmt"]: newAmt,
						};
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("查詢報價失敗", err), {
						position: "top-right"
					});
				}
			} else {
				processedRowData = {
					...processedRowData,
					["SAmt"]: "",
				};
			}

			console.log("processedRowData→", processedRowData);
			return processedRowData;
		},
		[httpGetAsync, sqtyManager, token]
	);

	const handleGridSAmtChange = useCallback(
		async ({ rowData, rowIndex, gridData, gridMeta }) => {

			let newRowData = {
				...rowData,
			};

			if (!rowData.SQty) {
				return {
					...newRowData,
					["SAmt"]: "",
				};
			}

			const prodId = rowData?.prod?.ProdID;
			const customerId = rowData?.customer?.CustID || "";
			const deptId = rowData?.dept?.DeptID || "";

			if (prodId) {
				try {
					const { status, payload, error } = await httpGetAsync({
						url: "v1/material/waste-orders/samt",
						bearer: token,
						params: {
							prdi: rowData?.prod?.ProdID,
							qty: rowData?.SQty || 0,
							csti: customerId,
							depi: deptId,
						},
					});

					if (status.success) {
						console.log("payload", payload);
						newRowData = {
							...newRowData,
							["SAmt"]: (parseFloat(payload["SAmt"]) || 0).toFixed(2),
						};
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("查詢報價失敗", err), {
						position: "top-right"
					});
				}
			} else {
				newRowData = {
					...newRowData,
					["SAmt"]: "",
				};
			}

			console.log("newRowData→", newRowData);
			return newRowData;
		},
		[httpGetAsync, token]
	);

	/**
	 * D3 此作業沒有做重複判斷, 數量也不足也不會提示密碼
	 */
	const handleGridProdChange = useCallback(
		async ({ rowData }) => {
			const { prod } = rowData;
			// 只有當原本沒有此項商品時才更新庫存表
			if (prod?.ProdID) {
				sqtyManager.updateStockQty(prod.ProdID, prod.StockQty)
			}

			let newRowData = {
				...rowData,
				["ProdData"]: prod?.ProdData || "",
				["PackData_N"]: prod?.PackData_N || "",
				["StockQty_N"]: prod?.StockQty || "",
				["SQty"]: "",
				["SAmt"]: "",
				["dtype"]: null,
				["dept"]: null,
				["customer"]: null,
				["tooltip"]: ""
			};
			return newRowData;
		},
		[sqtyManager]
	);

	const onUpdateRow = useCallback(
		({ newValue, fromRowIndex, gridMeta, updateResult }) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				updateResult.rowIndex = rowIndex;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				let dirty = false;

				// 商品
				if (rowData.prod?.ProdID !== oldRowData.prod?.ProdID) {
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
					});
					updateResult.cols.push("prod")
				}

				// 數量 變動
				if (processedRowData.SQty !== oldRowData.SQty) {
					updateResult.cols.push("SQty")
					processedRowData = await handleGridSQtyChange({
						rowData: processedRowData,
						rowIndex,
						gridData: newValue,
						gridMeta
					});
				}

				if (
					processedRowData.SQty !== oldRowData.SQty ||
					processedRowData.customer?.CustID !== oldRowData.customer?.CustID ||
					processedRowData.dept?.DeptID !== oldRowData.dept?.DeptID
				) {
					processedRowData = await handleGridSAmtChange({
						rowData: processedRowData,
						rowIndex,
						gridData: newValue,
						gridMeta
					});
					// console.log("handleGridSQtyChange done", processedRowData);
					dirty = true;
					updateResult.cols.push("SAmt")
				}
				if (dirty) {
					updateResult.rows++;
				}
				console.log(`第 ${rowIndex} 列處理完成`, processedRowData);
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange, handleGridSQtyChange, handleGridSAmtChange]
	);

	const mapTooltip = useCallback(({ prevGridData, gridData, rowIndex }) => {
		const targetRow = gridData[rowIndex];
		let targetProdID = targetRow.prod?.ProdID;
		// 如果 targetProdID 為空，則使用 prevGridData 的 ProdID
		if (!targetProdID) {
			targetProdID = prevGridData[rowIndex]?.prod?.ProdID || '';
		}

		// 若 targetProdID 仍為空，則不執行更新
		if (!targetProdID) {
			return gridData;
		}

		// 計算其他符合條件列的 SQty 加總
		return gridData.map((row, index) => {
			if (row.prod?.ProdID === targetProdID) {
				// 加總其他與 index 不同的 SQty
				let otherRowsTotalSQty = gridData.reduce((acc, innerRow, innerIndex) => {
					if (innerIndex !== index && innerRow.prod?.ProdID === targetProdID) {
						return acc + Number(innerRow.SQty || 0);
					}
					return acc;
				}, 0);

				const stock = sqtyManager.getStockQty(targetProdID);
				const remaining = stock - otherRowsTotalSQty;
				let processedRowData = {
					...row,
					StockQty_N: remaining,
				};

				processedRowData = {
					...processedRowData,
					["tooltip"]: D05.getTooltip({
						rowData: processedRowData,
						rowIndex
					}),
				}

				return processedRowData;
			}
			return row; // 不符合條件則返回原本的列
		});
	}, [sqtyManager]);

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult, prevGridData }) => {
		if (updateResult.cols.includes("SAmt")) {
			updateAmt({
				formData,
				gridData,
				setValue,
			});
		}

		if (updateResult.cols.includes("prod") || updateResult.cols.includes("SQty")) {
			console.log("before reduce", gridData);
			const updated = mapTooltip({ prevGridData, gridData, rowIndex: updateResult.rowIndex })
			console.log("after reduce", updated);
			return updated;
		}
	}, [updateAmt, mapTooltip]);

	const buildGridChangeHandlerOld = useCallback(
		({ getValues, setValue, gridMeta }) =>
			async (newValue, operations) => {
				// const formData = getValues();
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						const updatedRows = await Promise.all(
							newValue
								.slice(
									operation.fromRowIndex,
									operation.toRowIndex
								)
								.map(async (item, index) => {
									console.log("before update", item);
									const updatedRow = await onUpdateRow({
										fromRowIndex: operation.fromRowIndex,
										newValue,
										gridMeta
									})(item, index);
									console.log("updated", updatedRow);
									return updatedRow;
								})
						);
						newGridData.splice(
							operation.fromRowIndex,
							updatedRows.length,
							...updatedRows
						);
						console.log(newGridData);


						// newValue
						// 	.slice(operation.fromRowIndex, operation.toRowIndex)
						// 	.forEach(async (rowData, i) => {
						// 		let checkFailed = false;
						// 		const rowIndex = operation.fromRowIndex + i;
						// 		const oldRowData = prodGrid.gridData[rowIndex];
						// 		console.log(`開始處理第 ${rowIndex} 列...`);
						// 		let processedRowData = { ...rowData };
						// 		// 商品
						// 		if (
						// 			rowData.prod?.ProdID !==
						// 			oldRowData.prod?.ProdID
						// 		) {
						// 			processedRowData =
						// 				await handleGridProdChange({
						// 					rowData: processedRowData,
						// 				});
						// 			console.log(
						// 				"handleGridProdChange done",
						// 				processedRowData
						// 			);
						// 		}
						// 		// 數量, 客戶代碼, 門市碼 變動
						// 		if (
						// 			rowData.SQty !== oldRowData.SQty ||
						// 			rowData.customer?.CustID !==
						// 				oldRowData.customer?.CustID ||
						// 			rowData.dept?.DeptID !==
						// 				oldRowData.dept?.DeptID
						// 		) {
						// 			processedRowData =
						// 				await handleGridSQtyChange({
						// 					rowData: processedRowData,
						// 					rowIndex,
						// 					gridData: newValue,
						// 				});
						// 			console.log(
						// 				"handleGridSQtyChange done",
						// 				processedRowData
						// 			);
						// 		}
						// 		newGridData[rowIndex] = processedRowData;
						// 		console.log(
						// 			`第 ${rowIndex} 列處理完成`,
						// 			processedRowData
						// 		);
						// 		console.log("prodGrid.changed", newGridData);
						// 		if (!checkFailed) {
						// 			prodGrid.setGridData(newGridData);
						// 			updateAmt({
						// 				gridData: newGridData,
						// 				setValue,
						// 			});
						// 		}
						// 	});
					} else if (operation.type === "DELETE") {
						// do nothing
						grid.setGridData(newGridData);
						updateAmt({
							gridData: newGridData,
							setValue,
						});
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}

				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					grid.setGridData(newGridData);
					updateAmt({
						gridData: newGridData,
						setValue,
					});
				}
			},
		[grid, updateAmt, onUpdateRow]
	);

	const onEditorSubmit = useCallback(
		({ setValue, gridMeta }) => (data) => {
			console.log("onEditorSubmit", data);
			const collected = D05.transformForSubmitting(
				data,
				grid.gridData
			);
			console.log("collected", collected);
			handleSave({ data: collected, setValue, gridMeta })
		},
		[grid.gridData, handleSave]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "D05",
				IDs: crud.itemData?.CxlID,
			};
			console.log("jsonData", jsonData);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebD05Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.CxlID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					if (grid.gridData.length > 0) {
						const collected = D05.transformForSubmitting(
							data,
							grid.gridData
						);
						console.log("collected", collected);

						const { status, payload, error } = await httpPostAsync({
							url: "v1/material/waste-orders/refresh-grid",
							bearer: token,
							data: collected,
						});
						console.log("refresh-grid.payload", payload);
						if (status.success) {
							const data = D05.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							grid.handleGridDataLoaded(data.prods);
							updateAmt({ setValue, formData: data });
							toast.info("商品單價已更新");
						} else {
							throw error || new Error("未預期例外");
						}
					} else {
						updateAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toast.error(Errors.getMessage("商品單價更新失敗", err), {
						position: "top-right"
					});
					// 還原
				}
			},
		[httpPostAsync, grid, updateAmt, token]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/material/waste-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.CxlID,
				},
			});
			if (status.success) {
				crud.promptUpdating();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("編輯檢查失敗", err), {
				position: "top-right"
			});
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	const customerDisabled = useCallback(({ rowData }) => {
		return !!rowData?.dept?.DeptID || !rowData?.prod;
	}, []);

	const deptDisabled = useCallback(({ rowData }) => {
		return !!rowData?.customer?.CustID || !rowData?.prod;
	}, []);

	const sqtyDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const dtypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset,
		onSearchSubmit,
		onSearchSubmitError,
		confirmQuitCreating,
		confirmQuitUpdating,
		confirmReturnReading,
		confirmDelete,
		promptCreating,
		onEditorSubmit,
		onEditorSubmitError,
		// Grid
		...grid,
		grid,
		createRow,
		buildGridChangeHandlerOld,
		getRowKey,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// recoverStockMap,
		customerDisabled,
		deptDisabled,
		sqtyDisabled,
		dtypeDisabled,
		...sideDrawer,
		committed,
		onUpdateRow,
		onGridChanged
	};
};
