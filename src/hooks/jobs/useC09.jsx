/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C09 from "@/modules/md-c09";
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

export const useC09 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C09",
	});

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
		url: "v1/purchase/trans-in-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const refreshAmt = useCallback(
		({ setValue, data, gridData, reset = false }) => {
			if (reset) {
				setValue("TxiAmt", "");
			} else {
				if (data) {
					setValue("TxiAmt", data?.TxiAmt);
					return;
				}

				if (gridData) {
					const total = C09.getTotal(gridData);
					setValue("TxiAmt", total.toFixed(2));
					return;
				}
				setValue("TxiAmt", "");
			}
		},
		[]
	);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
			SPrice: "",
			SAmt: "",
			stype: null,
			dtype: null,
			SRemark: "",
			ChkQty: "",
			SoQty: 0,
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			txiDate: new Date(),
			TxiAmt: "",
			employee: null,
			depOrders: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.prods, { createRow });
	}, [createRow, crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/purchase/trans-in-orders",
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
				toast.error(Errors.getMessage("新增失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPostAsync, listLoader, token]
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
					url: "v1/purchase/trans-in-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C09.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					// setSelectedInq(data);

					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, grid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.撥入單號 });
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
					url: "v1/purchase/trans-in-orders",
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
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除撥入單「${itemData?.TxiID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/trans-in-orders`,
						bearer: token,
						params: {
							id: itemData?.TxiID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除撥入單 ${itemData?.TxiID}`);
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
				params: C09.transformAsQueryParams(data),
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

	const getProdInfo = useCallback(
		async (prodId, { txoDeptId }) => {
			if (!prodId) {
				toast.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/trans-in-orders/prod-info",
					bearer: token,
					params: {
						pd: prodId,
						todp: txoDeptId,
					},
				});

				if (status.success) {
					return payload;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢報價失敗", err), {
					position: "top-right"
				});
			}
		},
		[httpGetAsync, token]
	);

	const stypeDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);
	const dtypeDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);
	const sqtyDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);

	const sprodDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);

	/**
	 * 撥出單號改變
	 * → 指定撥出門市
	 */
	const handleTxoOrderChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("handleTxoOrderChanged", newValue);
				if (!newValue) {
					setValue("txoDept", null);

					grid.setGridData([], { createRow });
					setValue("depOrders", []);
					setValue("remark", "");
					setValue("TxiAmt", "0.00");
					return;
				} else {
					setValue(
						"txoDept",
						newValue?.撥出門市
							? {
								DeptID: newValue.撥出門市,
								AbbrName: newValue.撥出門市名稱,
							}
							: null
					);
				}

				const formData = getValues();
				console.log("formData", formData);
				const collected = C09.transformForSubmitting(
					formData,
					grid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/trans-in-orders/load-prods",
						bearer: token,
						data: collected,
					});
					console.log("load-prods.payload", payload);
					if (status.success) {
						const data = C09.transformForReading(payload.data[0]);
						console.log("refreshed data", data);
						grid.setGridData(data.prods, { createRow, supressEvents: true });
						setValue("depOrders", data.depOrders);
						setValue("TxoChk", data.TxoChk);
						setValue("remark", data.remark);
						refreshAmt({ setValue, data, gridData: data.prods });
						// toast.info("撥出單商品已載入");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入撥出單商品失敗", err), {
						position: "top-right"
					});
				}
			},
		[createRow, httpPostAsync, grid, refreshAmt, token]
	);

	/**
	 * 改變撥出門市
	 * → 清空 撥出單號
	 */
	const handleTxoDeptChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("handleTxoDeptChanged", newValue);
				setValue("txoOrder", null, {
					shouldTouch: true
				});

				grid.setGridData([], { createRow });
				setValue("depOrders", []);
				setValue("remark", "");

				setValue("TxiAmt", "0.00");
			},
		[createRow, grid]
	);


	const handleGridSQtyChange = useCallback(({ rowData }) => {
		let newRowData = {
			...rowData,
			["SAmt"]:
				!rowData.SPrice || !rowData.SQty
					? ""
					: rowData.stype?.id
						? 0
						: rowData.SPrice * rowData.SQty,
		};
		return newRowData;
	}, []);

	const handleGridProdChange = useCallback(
		async ({ rowData, txiDeptId }) => {
			const { prod } = rowData;
			const prodInfo = prod?.ProdID ? await getProdInfo(prod?.ProdID, {
				txiDeptId,
			}) : null;

			// 取得報價

			let newRowData = {
				...rowData,
				["prod"]: prodInfo?.Price ? rowData.prod : null,
				["ProdData"]: prod?.ProdData || "",
				["PackData_N"]: prod?.PackData_N || "",
				["SPrice"]: prodInfo?.Price || "",
				["SQty"]: "",
				["SAmt"]: "",
				["stype"]: null,
				["dtype"]: null,
				["SoFlag_N"]: prodInfo?.SoFlag_N || "",
				["StockQty_N"]: prodInfo?.Stock || "",

			};

			if (prod && !prodInfo?.Price) {
				toast.error("商品未訂調撥成本，不得訂購", {
					position: "top-right",
				});
			}
			return newRowData;
		},
		[getProdInfo]
	);

	const updateGridRow = useCallback(({ fromRowIndex, formData }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// 商品
		if (
			rowData.prod?.ProdID !==
			oldRowData.prod?.ProdID
		) {
			processedRowData =
				await handleGridProdChange({
					rowData,
					txoDeptId: formData.txoDept?.DeptID,
				});
		}

		// 單價, 贈,  數量
		if (
			rowData.SQty !== oldRowData.SQty ||
			rowData.stype?.id !== oldRowData.stype?.id
		) {
			processedRowData = handleGridSQtyChange({
				rowData: processedRowData,
			});
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange, handleGridSQtyChange]);

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue, gridMeta }) =>
			async (newValue, operations) => {
				const formData = getValues();
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						if (!grid.asyncRef.supressEvents) {
							const updatedRows = await Promise.all(
								newValue
									.slice(
										operation.fromRowIndex,
										operation.toRowIndex
									)
									.map(async (item, index) => {
										const updatedRow = await updateGridRow({
											formData,
											newValue,
											setValue,
											fromRowIndex: operation.fromRowIndex,
											gridMeta
										})(item, index);
										return updatedRow;
									})
							)
							console.log("updatedRows", updatedRows);

							newGridData.splice(
								operation.fromRowIndex,
								updatedRows.length,
								...updatedRows
							)
						} else {
							console.log("grid.asyncRef.supressEvents is TRUE, grid changes not triggered");
						}
						// newValue
						// 	.slice(operation.fromRowIndex, operation.toRowIndex)
						// 	.forEach(async (rowData, i) => {
						// 		const rowIndex = operation.fromRowIndex + i;
						// 		const oldRowData = grid.gridData[rowIndex];

						// 		let processedRowData = { ...rowData };
						// 		// 商品
						// 		if (
						// 			rowData.prod?.ProdID !==
						// 			oldRowData.prod?.ProdID
						// 		) {
						// 			processedRowData =
						// 				await handleGridProdChange({
						// 					rowData,
						// 					txoDeptId: formData.txoDept?.DeptID,
						// 				});
						// 		}

						// 		// 單價, 贈,  數量
						// 		if (
						// 			rowData.SQty !== oldRowData.SQty ||
						// 			rowData.stype?.id !== oldRowData.stype?.id
						// 		) {
						// 			processedRowData = handleGridSQtyChange({
						// 				rowData,
						// 			});
						// 		}
						// 		newGridData[rowIndex] = processedRowData;
						// 	});
					} else if (operation.type === "DELETE") {
						// 列舉原資料
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					grid.setGridData(newGridData);
					refreshAmt({
						gridData: newGridData,
						setValue,
					});
				}
			},
		[grid, updateGridRow, refreshAmt]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C09.transformForSubmitting(
				data,
				grid.gridData
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
			grid.gridData,
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
				JobName: "C09",
				IDs: crud.itemData?.TxiID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC09Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.TxiID,
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
						const collected = C09.transformForSubmitting(
							data,
							grid.gridData
						);
						console.log("collected", collected);

						const { status, payload, error } = await httpPostAsync({
							url: "v1/purchase/trans-in-orders/refresh-grid",
							bearer: token,
							data: collected,
						});
						console.log("refresh-grid.payload", payload);
						if (status.success) {
							const data = C09.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							grid.initGridData(data.prods, { createRow });
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
					toast.error(Errors.getMessage("商品單價更新失敗", err), {
						position: "top-right"
					});
					// 還原
				}
			},
		[createRow, httpPostAsync, grid, refreshAmt, token]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/purchase/trans-in-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.TxoID,
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

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
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
		createRow,
		...grid,
		grid,
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
		handleTxoOrderChanged,
		getSPriceClassName,
		handleTxoDeptChanged,
		sprodDisabled,
		sqtyDisabled,
		stypeDisabled,
		dtypeDisabled,
	};
};
