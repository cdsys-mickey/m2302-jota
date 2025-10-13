/* eslint-disable no-mixed-spaces-and-tabs */
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import D05 from "@/modules/D05.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { nanoid } from "nanoid";
import { useCallback, useContext, useRef } from "react";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useMemo } from "react";
import useJotaReports from "../useJotaReports";

export const useD05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
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
		url: "v1/mat/waste-orders",
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
		keyColumn: "Pkey",
		createRow,
	});

	const sqtyManager = useSQtyManager({
		grid,
	});
	const { committed } = sqtyManager;

	const updateAmt = useCallback(({ setValue, gridData, reset = false }) => {
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
	}, []);

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
		sqtyManager.reset();
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
					url: "v1/mat/waste-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = D05.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: data,
					});
					await sqtyManager.recoverStockMap(data.prods);

					grid.initGridData(data.prods);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedReading(err);
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

				const { status, error } = creating
					? await httpPostAsync({
							url: "v1/mat/waste-orders",
							data: data,
							bearer: token,
					  })
					: await httpPutAsync({
							url: "v1/mat/waste-orders",
							data: data,
							bearer: token,
					  });
				if (status.success) {
					toastEx.success(creating ? `新增成功` : `修改成功`);
					if (creating) {
						crud.finishedCreating();
						crud.cancelReading();
					} else {
						crud.finishedUpdating();
						loadItem({ refresh: true });
					}

					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				if (creating) {
					crud.failedCreating();
				} else {
					crud.failedUpdating();
				}
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
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
	// 				url: "v1/mat/waste-orders",
	// 				data: data,
	// 				bearer: token,
	// 			});
	// 			if (status.success) {
	// 				toastEx.success(`修改成功`);
	// 				crud.finishedUpdating();
	// 				//crud.cancelReading();
	// 				loadItem({ refresh: true });
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error ?? new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedUpdating();
	// 			console.error("handleUpdate.failed", err);
	// 			if (err.code === 102) {
	// 				recoverStockMap(data.prods, { mark: true });
	// 				toastEx.error("部分商品庫存不足，請調整後再送出", {
	// 					position: "top-right"
	// 				});
	// 			} else {
	// 				toastEx.error("修改失敗", err), {
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
						url: `v1/mat/waste-orders`,
						bearer: token,
						params: {
							id: itemData?.CxlID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除報廢單 ${itemData?.CxlID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failedDeleting(err);
					console.error("confirmDelete.failed", err);
					toastEx.error("刪除失敗", err);
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
					employee: null,
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
			});

			if (prodStock < rowData.SQty) {
				processedRowData = {
					...rowData,
					["SQty"]: 0,
					["SAmt"]: 0,
				};
				toastEx.error(
					`第 ${rowIndex + 1} 筆庫存量不足(${prodStock} < ${
						rowData.SQty
					})！`
				);
				gridMeta.setActiveCell({
					col: "SQty",
					row: rowIndex,
				});
				return processedRowData;
			}

			const prodId = rowData?.prod?.ProdID;
			const customerId = rowData?.customer?.CustID || "";
			const deptId = rowData?.dept?.DeptID || "";

			if (prodId && (customerId || deptId)) {
				try {
					const { status, payload, error } = await httpGetAsync({
						url: "v1/mat/waste-orders/samt",
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
						const newAmt = (
							parseFloat(payload["SAmt"]) || 0
						).toFixed(2);
						processedRowData = {
							...processedRowData,
							["SAmt"]: newAmt,
						};
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("查詢報價失敗", err);
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
						url: "v1/mat/waste-orders/samt",
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
							["SAmt"]: (
								parseFloat(payload["SAmt"]) || 0
							).toFixed(2),
						};
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("查詢報價失敗", err);
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

	const getProdInfo = useCallback(
		async (prodId) => {
			if (!prodId) {
				toastEx.error("請先選擇商品", {
					position: "top-right",
				});
				return;
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/stock",
					bearer: token,
					params: {
						id: prodId,
						safety: 1,
					},
				});

				if (status.success) {
					sqtyManager.updateStockQty(
						prodId,
						payload.Stock ?? payload.StockQty
					);
					return payload;
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢庫存失敗", err);
			}
		},
		[httpGetAsync, sqtyManager, token]
	);

	/**
	 * D3 此作業沒有做重複判斷, 數量也不足也不會提示密碼
	 */
	const handleGridProdChange = useCallback(
		async ({ rowData }) => {
			const prodInfo = rowData?.prod
				? await getProdInfo(rowData?.prod?.ProdID)
				: null;

			const { prod } = rowData;
			// 只有當原本沒有此項商品時才更新庫存表
			if (prod?.ProdID) {
				sqtyManager.updateStockQty(prod.ProdID, prod.StockQty);
			}

			let newRowData = {
				...rowData,
				["ProdData"]: prod?.ProdData || "",
				["PackData_N"]: prod?.PackData_N || "",
				["StockQty_N"]: prod?.StockQty || "",
				["SafeQty_N"]: prodInfo?.Safety ?? "",
				["SQty"]: "",
				["SAmt"]: "",
				["dtype"]: null,
				["dept"]: null,
				["customer"]: null,
				["tooltip"]: "",
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
					updateResult.cols.push("prod");
				}

				// 數量 變動
				if (processedRowData.SQty !== oldRowData.SQty) {
					updateResult.cols.push("SQty");
					processedRowData = await handleGridSQtyChange({
						rowData: processedRowData,
						rowIndex,
						gridData: newValue,
						gridMeta,
					});
				}

				if (
					processedRowData.SQty !== oldRowData.SQty ||
					processedRowData.customer?.CustID !==
						oldRowData.customer?.CustID ||
					processedRowData.dept?.DeptID !== oldRowData.dept?.DeptID
				) {
					processedRowData = await handleGridSAmtChange({
						rowData: processedRowData,
						rowIndex,
						gridData: newValue,
						gridMeta,
					});
					// console.log("handleGridSQtyChange finished", processedRowData);
					dirty = true;
					updateResult.cols.push("SAmt");
				}
				if (dirty) {
					updateResult.rows++;
				}
				console.log(`第 ${rowIndex} 列處理完成`, processedRowData);
				return processedRowData;
			},
		[
			grid.gridData,
			handleGridProdChange,
			handleGridSQtyChange,
			handleGridSAmtChange,
		]
	);

	const mapTooltip = useCallback(
		({ updateResult, prevGridData, gridData, rowIndex }) => {
			let targetProdID;
			if (updateResult?.type === "DELETE") {
				targetProdID = prevGridData[rowIndex]?.prod?.ProdID || "";
			} else {
				const targetRow = gridData[rowIndex];
				targetProdID = targetRow.prod?.ProdID;
				// 如果 targetProdID 為空，則使用 prevGridData 的 ProdID
				if (!targetProdID) {
					targetProdID = prevGridData[rowIndex]?.prod?.ProdID || "";
				}
			}

			// 若 targetProdID 仍為空，則不執行更新
			if (!targetProdID) {
				console.log("targetProdID 為空, 不執行 mapTooltip");
				return gridData;
			}

			// 計算其他符合條件列的 SQty 加總
			return gridData.map((row, index) => {
				if (row.prod?.ProdID === targetProdID) {
					// 加總其他與 index 不同的 SQty
					// let otherRowsTotalSQty = gridData.reduce((acc, innerRow, innerIndex) => {
					// 	if (innerIndex !== index && innerRow.prod?.ProdID === targetProdID) {
					// 		return acc + Number(innerRow.SQty || 0);
					// 	}
					// 	return acc;
					// }, 0);

					// const ogStock = sqtyManager.getStockQty(targetProdID);
					// const stock = ogStock - otherRowsTotalSQty;
					const stock = sqtyManager.getRemainingStock({
						prodId: targetProdID,
						gridData,
					});

					let processedRowData = {
						...row,
						StockQty_N: stock,
					};

					processedRowData = {
						...processedRowData,
						["tooltip"]: D05.getTooltips({
							rowData: processedRowData,
							rowIndex,
						}),
					};

					return processedRowData;
				}
				return row; // 不符合條件則返回原本的列
			});
		},
		[sqtyManager]
	);

	const onGridChanged = useCallback(
		({ gridData, formData, setValue, updateResult, prevGridData }) => {
			if (updateResult.cols.includes("SAmt")) {
				updateAmt({
					formData,
					gridData,
					setValue,
				});
			}

			if (
				updateResult.cols.includes("prod") ||
				updateResult.cols.includes("SQty") ||
				updateResult.type === "DELETE"
			) {
				console.log("before reduce", gridData);
				const updated = mapTooltip({
					updateResult,
					prevGridData,
					gridData,
					rowIndex: updateResult.rowIndex,
				});
				console.log("after reduce", updated);
				return updated;
			}
		},
		[updateAmt, mapTooltip]
	);

	const onEditorSubmit = useCallback(
		({ setValue, gridMeta }) =>
			(data) => {
				console.log("onEditorSubmit", data);
				const collected = D05.transformForSubmitting(
					data,
					grid.gridData
				);
				console.log("collected", collected);
				handleSave({ data: collected, setValue, gridMeta });
			},
		[grid.gridData, handleSave]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebD05Rep.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "D05",
				IDs: crud.itemData?.CxlID,
			};
			// console.log("jsonData", data);
			// postToBlank(
			// 	`${config.REPORT_URL}/WebD05Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.CxlID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("handlePrint", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

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
							url: "v1/mat/waste-orders/refresh-grid",
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
							toastEx.info("商品單價已更新");
						} else {
							throw error ?? new Error("未預期例外");
						}
					} else {
						updateAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toastEx.error("商品單價更新失敗", err);
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
				url: "v1/mat/waste-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.CxlID,
				},
			});
			if (status.success) {
				crud.promptUpdating();
			} else {
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			toastEx.error("編輯檢查失敗", err);
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
		// buildGridChangeHandlerOld,
		getRowKey,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		handlePrint,
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
		onGridChanged,
	};
};
