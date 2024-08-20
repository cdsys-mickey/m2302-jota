/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import D05 from "@/modules/md-d05";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";
import { isDate } from "date-fns";
import Forms from "../../shared-modules/sd-forms";
import { useToggle } from "../../shared-hooks/useToggle";
import { nanoid } from "nanoid";

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

	const qtyMap = useMemo(() => new Map(), []);

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

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const refreshAmt = useCallback(
		({ setValue, data, gridData, reset = false }) => {
			if (reset) {
				setValue("TotAmt_N", "");
			} else {
				if (data) {
					setValue("TotAmt_N", data?.TotAmt_N);
					return;
				}

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

	const calcProdStock = useCallback(
		({ prodId, rowIndex, gridData }) => {
			const totalSQty = gridData
				.filter(
					(item, index) =>
						item.prod?.ProdID === prodId && index < rowIndex
				)
				.reduce((sum, item) => sum + parseFloat(item.SQty), 0);
			const stock = qtyMap.get(prodId) || 0;
			return stock - totalSQty;
		},
		[qtyMap]
	);

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

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			wdate: new Date(),
			TotAmt_N: "",
			employee: null,
		};
		crud.promptCreating({ data });
		qtyMap.clear();
		prodGrid.initGridData(data.prods, { createRow });
	}, [createRow, crud, prodGrid, qtyMap]);

	const loadStockMap = useCallback(
		async (
			data,
			opts = {
				mark: false,
			}
		) => {
			const gridData = data || prodGrid.gridData;

			if (!gridData || gridData.length === 0) {
				return;
			}
			const prodIds = [
				...new Set(
					gridData
						.filter((item) => item.prod?.ProdID)
						.map((item) => item.prod.ProdID)
				),
			];
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inventory/stock-map",
					bearer: token,
					params: {
						id: prodIds.join(","),
					},
				});
				if (status.success) {
					payload.Stock?.map((x) =>
						qtyMap.set(x.ProdID, Number(x.Qty))
					);
					if (opts.mark) {
						let newGridData = [...gridData];
						gridData.forEach((rowData, rowIndex) => {
							const prodId = rowData.prod.ProdID;
							const sqty = Number(rowData.SQty);
							const prodStock = calcProdStock({
								rowIndex,
								prodId,
								gridData,
							});
							newGridData[rowIndex] = {
								...rowData,
								["StockQty_N"]: (
									qtyMap.get(prodId) || 0
								).toFixed(2),
								sqtyError: sqty > prodStock,
							};
						});
						prodGrid.setGridData(newGridData);
					}
					console.log("qtyMap:", qtyMap);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("取得庫存失敗", err));
			}
		},
		[calcProdStock, httpGetAsync, prodGrid, qtyMap, token]
	);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/material/waste-orders",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(`新增成功`);
					crud.doneCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failCreating();
				console.error("handleCreate.failed", err);
				if (err.code === 102) {
					loadStockMap(data.prods, { mark: true });
					toast.error("部分商品庫存不足，請調整後再送出");
				} else {
					toast.error(Errors.getMessage("新增失敗", err));
				}
			}
		},
		[crud, httpPostAsync, listLoader, loadStockMap, token]
	);

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
					// setSelectedInq(data);

					prodGrid.initGridData(data.prods);
					loadStockMap(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, loadStockMap, prodGrid, token]
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
	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: "v1/material/waste-orders",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(`修改成功`);
					crud.doneUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating();
				console.error("handleUpdate.failed", err);
				if (err.code === 102) {
					loadStockMap(data.prods, { mark: true });
					toast.error("部分商品庫存不足，請調整後再送出");
				} else {
					toast.error(Errors.getMessage("修改失敗", err));
				}
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, loadStockMap, token]
	);

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
					toast.error(Errors.getMessage("刪除失敗", err));
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				handlePopperClose();
				listLoader.loadList({
					params: {},
				});
				reset({});
			},
		[handlePopperClose, listLoader]
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
		async ({ rowData, rowIndex, gridData }) => {
			let newRowData = {
				...rowData,
			};

			if (!rowData.SQty) {
				return {
					...newRowData,
					["SAmt"]: 0,
				};
			}

			const prodStock = calcProdStock({
				rowIndex,
				prodId: rowData.prod.ProdID,
				gridData,
			});

			if (prodStock < rowData.SQty) {
				newRowData = {
					...rowData,
					["SQty"]: 0,
					["SAmt"]: 0,
				};
				toast.warn(`第 ${rowIndex + 1} 筆庫存量 (${prodStock}) 不足!`);
				return newRowData;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/material/waste-orders/samt",
					bearer: token,
					params: {
						prdi: rowData?.prod?.ProdID,
						qty: rowData?.SQty || 0,
						csti: rowData?.customer?.CustID || "",
						depi: rowData?.dept?.DeptID || "",
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
				toast.error(Errors.getMessage("查詢報價失敗", err));
			}
			console.log("newRowData→", newRowData);
			return newRowData;
		},
		[calcProdStock, httpGetAsync, token]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData }) => {
			const { prod } = rowData;
			let newRowData = {
				...rowData,
				["SQty"]: "",
				["SAmt"]: "",
				["StockQty_N"]: "",
				["dtype"]: null,
				["dept"]: null,
				["customer"]: null,
			};

			let prodInfoRetrieved = false;
			if (prod?.ProdID) {
				// 取得報價
				prodInfoRetrieved = true;
				qtyMap.set(prod.ProdID, prod.StockQty);
				console.log("qtyMap updated", qtyMap);
			}
			newRowData = {
				...newRowData,
				["PackData_N"]: prod?.PackData_N || "",
				["StockQty_N"]: prod?.StockQty || "",
			};
			if (!prodInfoRetrieved) {
				newRowData = {
					...newRowData,
					["prod"]: null,
				};
			}
			return newRowData;
		},
		[qtyMap]
	);

	const updateRowHandler = useCallback(
		({ newValue, fromIndex }) =>
			async (rowData, index) => {
				const rowIndex = fromIndex + index;
				const oldRowData = prodGrid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// 商品
				if (rowData.prod?.ProdID !== oldRowData.prod?.ProdID) {
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
					});
					// console.log("handleGridProdChange done", processedRowData);
				}
				// 數量, 客戶代碼, 門市碼 變動
				if (
					rowData.SQty !== oldRowData.SQty ||
					rowData.customer?.CustID !== oldRowData.customer?.CustID ||
					rowData.dept?.DeptID !== oldRowData.dept?.DeptID
				) {
					processedRowData = await handleGridSQtyChange({
						rowData: processedRowData,
						rowIndex,
						gridData: newValue,
					});
					// console.log("handleGridSQtyChange done", processedRowData);
				}
				console.log(`第 ${rowIndex} 列處理完成`, processedRowData);
				return processedRowData;
			},
		[handleGridProdChange, handleGridSQtyChange, prodGrid.gridData]
	);

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue }) =>
			async (newValue, operations) => {
				// const formData = getValues();
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];

				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						const allRows = [...newValue];
						const updatedRows = await Promise.all(
							newValue
								.slice(
									operation.fromRowIndex,
									operation.toRowIndex
								)
								.map(async (item, index) => {
									console.log("before update", item);
									const updatedRow = await updateRowHandler({
										fromIndex: operation.fromRowIndex,
										newValue,
									})(item, index);
									console.log("updated", updatedRow);
									return updatedRow;
								})
						);
						allRows.splice(
							operation.fromRowIndex,
							updatedRows.length,
							...updatedRows
						);
						console.log(allRows);
						prodGrid.setGridData(allRows);
						refreshAmt({
							gridData: allRows,
							setValue,
						});

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
						// 			refreshAmt({
						// 				gridData: newGridData,
						// 				setValue,
						// 			});
						// 		}
						// 	});
					} else if (operation.type === "DELETE") {
						// do nothing
						prodGrid.setGridData(newGridData);
						refreshAmt({
							gridData: newGridData,
							setValue,
						});
					} else {
						prodGrid.setGridData(newGridData);
					}
				}
			},
		[prodGrid, refreshAmt, updateRowHandler]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = D05.transformForSubmitting(
				data,
				prodGrid.gridData
			);
			console.log("collected", collected);
			if (crud.creating) {
				handleCreate({ data: collected });
			} else if (crud.updating) {
				handleUpdate({ data: collected });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			prodGrid.gridData,
		]
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
					if (prodGrid.gridData.length > 0) {
						const collected = D05.transformForSubmitting(
							data,
							prodGrid.gridData
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
							prodGrid.handleGridDataLoaded(data.prods);
							refreshAmt({ setValue, data });
							toast.info("商品單價已更新");
						} else {
							throw error || new Error("未預期例外");
						}
					} else {
						refreshAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toast.error(Errors.getMessage("商品單價更新失敗", err));
					// 還原
				}
			},
		[httpPostAsync, prodGrid, refreshAmt, token]
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
			toast.error(Errors.getMessage("編輯檢查失敗", err));
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
		...prodGrid,
		buildGridChangeHandler,
		getRowKey,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		loadStockMap,
		customerDisabled,
		deptDisabled,
		sqtyDisabled,
		dtypeDisabled,
	};
};
