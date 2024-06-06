import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C08 from "@/modules/md-C08";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "../../shared-hooks/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";
import { isDate } from "date-fns";
import Forms from "../../shared-modules/sd-forms";
import { useToggle } from "@/shared-hooks/useToggle";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";

export const useC08 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C08",
	});
	const stockPwordRef = useRef();

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
		url: "v1/purchase/trans-out-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	// 挑戰
	const pwordLockRef = useRef(null);
	const sqtyLockRef = useRef(null);

	const loadStockPword = useCallback(async () => {
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/ou/dept/params`,
				bearer: token,
				params: {
					id: "StockPword",
					dc: 1,
				},
			});
			if (status.success) {
				pwordLockRef.current = {
					value: payload,
					passed: false,
				};
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("讀取設定發生錯誤", err));
		}
	}, [httpGetAsync, token]);

	const refreshAmt = useCallback(
		({ setValue, data, gridData, reset = false }) => {
			if (reset) {
				setValue("TxoAmt", "");
			} else {
				if (data) {
					setValue("TxoAmt", data?.TxoAmt);
					return;
				}

				if (gridData) {
					const total = C08.getTotal(gridData);
					setValue("TxoAmt", total.toFixed(2));
					return;
				}
				setValue("TxoAmt", "");
			}
		},
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			TxoDate: new Date(),
			RecvAmt: "",
			taxExcluded: false,
			employee: null,
			supplier: null,
			depOrders: [],
		};
		crud.promptCreating({ data });
		qtyMap.clear();
		prodGrid.handleGridDataLoaded(data.prods);
	}, [crud, prodGrid, qtyMap]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/purchase/trans-out-orders",
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
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, listLoader, token]
	);

	const loadQtyMap = useCallback(
		async (gridData) => {
			const prodIds = [
				...new Set(
					gridData
						.filter((item) => item.prod?.ProdID)
						.map((item) => item.prod.ProdID)
				),
			];
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/trans-out-orders/stock",
					bearer: token,
					params: {
						id: prodIds.join(","),
					},
				});
				if (status.success) {
					// do nothing
					payload.Stock?.map((x) =>
						qtyMap.set(x.ProdID, Number(x.Qty))
					);
					console.log("qtyMap:", qtyMap);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("取得庫存失敗", err));
			}
		},
		[httpGetAsync, qtyMap, token]
	);

	const getProdStock = useCallback(
		(prodId, newValue) => {
			const totalSQty = newValue
				.filter((item) => item.prod.ProdID === prodId) // 過濾出 ProdID 為 "12305414" 的項目
				.reduce((sum, item) => sum + parseFloat(item.SQty), 0); // 加總 SQty
			const stock = qtyMap.get(prodId) || 0;
			return stock - totalSQty;
		},
		[qtyMap]
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
					url: "v1/purchase/trans-out-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C08.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					prodGrid.handleGridDataLoaded(data.prods);
					loadQtyMap(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, loadQtyMap, prodGrid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.撥出單號 });
		},
		[crud, loadItem]
	);

	const isSupplierNameDisabled = useCallback((supplier) => {
		return supplier?.FactID !== "*";
	}, []);

	const refreshAction = useAction();

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
					url: "v1/purchase/trans-out-orders",
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
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除撥出單「${itemData?.TxoID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/trans-out-orders`,
						bearer: token,
						params: {
							id: itemData?.TxoID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除撥出單 ${itemData?.TxoID}`);
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
				params: C08.transformAsQueryParams(data),
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
		async (prodId, { txiDeptId }) => {
			if (!prodId) {
				toast.error("請先選擇商品");
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/trans-out-orders/prod-info",
					bearer: token,
					params: {
						pd: prodId,
						ind: txiDeptId,
					},
				});

				if (status.success) {
					return payload;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢調撥成本失敗", err));
			}
		},
		[httpGetAsync, token]
	);

	const commitSQty = useCallback(() => {
		const sqtyLock = sqtyLockRef.current;
		// 置換
		console.log("commit");
		prodGrid.setValueByRowIndex(sqtyLock.rowIndex, {
			SQty: sqtyLock.demand,
			SQtyNote: "*",
		});
		prodGrid.setActiveCell({
			col: "SQty",
			row: sqtyLock.rowIndex,
		});
		sqtyLockRef.current = null;
	}, [prodGrid]);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag;
	}, []);

	const handleGridSelectionChange = useCallback(({ selection }) => {
		console.log("selection", selection);
	}, []);

	/**
	 * 確認強迫銷貨
	 */
	const promptOverrideSQty = useCallback(() => {
		const sqtyLock = sqtyLockRef.current;
		dialogs.confirm({
			message: `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock})，是否強迫銷貨？`,
			onConfirm: () => {
				commitSQty();
			},
		});
	}, [commitSQty, dialogs]);

	const promptPwordEntry = useCallback(
		({ promptOverrideSQty, first = true }) => {
			console.log("promptPwordEntry, first:", first);
			const sqtyLock = sqtyLockRef.current;
			const pwordLock = pwordLockRef.current;
			dialogs.prompt({
				title: "庫存不足",
				message: first
					? `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock}), 請輸入密碼`
					: "密碼錯誤，請再次輸入或取消",
				label: "強迫銷貨密碼",
				disableCloseOnConfirm: true,
				onConfirm: (value) => {
					if (value === pwordLock.value) {
						console.log("pword passed");
						pwordLockRef.current = {
							...pwordLockRef.current,
							passed: true,
						};
						dialogs.closeLatest();
						promptOverrideSQty();
					} else {
						dialogs.closeLatest();
						console.log("pword not passed");
						promptPwordEntry({ promptOverrideSQty, first: false });
					}
				},
				onCancel: () => {
					console.log("pword cancelled");
					prodGrid.setActiveCell({
						col: "SQty",
						row: sqtyLock.rowIndex,
					});
				},
				// confirmText: "通過",
			});
		},
		[dialogs, prodGrid]
	);

	const handleOverrideSQty = useCallback(() => {
		const pwordLock = pwordLockRef.current;
		// 1.如果通過密碼判定(stockPwordPassedRef.current), 則直接跳確認
		prodGrid.setActiveCell(null);
		if (!pwordLock?.passed) {
			promptPwordEntry({ promptOverrideSQty });
			return;
		}
		promptOverrideSQty();
	}, [prodGrid, promptOverrideSQty, promptPwordEntry]);

	const handleGridChange = useCallback(
		({ getValues, setValue }) =>
			(newValue, operations) => {
				const formData = getValues();
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach(async (rowData, i) => {
								const {
									prod,
									SPrice,
									SQty,
									stype,
									PKey,
									chkQty,
								} = rowData;
								const rowIndex = operation.fromRowIndex + i;
								const {
									prod: oldProd,
									SPrice: oldSPrice,
									SQty: oldSQty,
									stype: oldSType,
								} = prodGrid.gridData[rowIndex];

								let processedRowData = { ...rowData };
								// 商品
								if (prod?.ProdID !== oldProd?.ProdID) {
									processedRowData = {
										...processedRowData,
										["SQtyNote"]: "",
									};
									console.log(
										`prod[${rowIndex}] changed`,
										prod
									);
									let prodInfoRetrieved = false;
									if (prod?.ProdID) {
										const prodInfo = await getProdInfo(
											prod?.ProdID,
											{
												txiDeptId:
													formData.txiDept.DeptID,
											}
										);
										// 取得報價
										prodInfoRetrieved =
											prodInfo && !!prodInfo.Price;
										qtyMap.set(prod.ProdID, prodInfo.Stock);
										processedRowData = {
											...processedRowData,
											["PackData_N"]:
												prod?.PackData_N || "",
											...(prodInfoRetrieved && {
												SPrice: prodInfo.Price,
												// SMsg: `庫存為 ${prodInfo.Stock}`,
											}),
										};
									}
									if (!prodInfoRetrieved) {
										processedRowData = {
											...processedRowData,
											["prod"]: null,
											["SPrice"]: "",
											["PackData_N"]: "",
											["SMsg"]: "",
										};
									}
								}

								let modifiedSQty = SQty;

								// 數量, 且有選 prod
								if (SQty !== oldSQty && !!prod) {
									const prodStock = getProdStock(
										prod.ProdID,
										newValue
									);

									if (prodStock < 0) {
										processedRowData = {
											...processedRowData,
											["SQty"]: 0,
										};
										modifiedSQty = 0;
										sqtyLockRef.current = {
											rowIndex: rowIndex,
											prod: prod,
											demand: SQty,
											stock: prodStock,
										};

										handleOverrideSQty();
									} else {
										processedRowData = {
											...processedRowData,
											["SQtyNote"]: "",
										};
									}
								}

								// 單價, 贈,  數量, 改用 sqty
								if (
									SPrice !== oldSPrice ||
									modifiedSQty !== oldSQty
								) {
									// 計算合計
									processedRowData = {
										...processedRowData,
										["SAmt"]:
											!SPrice || !modifiedSQty
												? ""
												: stype?.id
												? 0
												: SPrice * modifiedSQty,
									};
								}
								newGridData[rowIndex] = processedRowData;
							});
					} else if (operation.type === "DELETE") {
						// 列舉原資料
						// checkFailed = prodGrid.gridData
						// 	.slice(operation.fromRowIndex, operation.toRowIndex)
						// 	.some((rowData, i) => {
						// 		if (prodDisabled({ rowData })) {
						// 			const rowIndex = operation.fromRowIndex + i;
						// 			toast.error(
						// 				`不可刪除第 ${rowIndex + 1} 筆商品`
						// 			);
						// 			return true;
						// 		}
						// 		return false;
						// 	});
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					prodGrid.setGridData(newGridData);
					refreshAmt({ setValue, gridData: newGridData });
				}
			},
		[
			getProdInfo,
			getProdStock,
			handleOverrideSQty,
			prodGrid,
			qtyMap,
			refreshAmt,
		]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C08.transformForSubmitting(
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
				JobName: "C08",
				IDs: crud.itemData?.TxoID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC08Rep.aspx?LogKey=${
					operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.TxoID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/purchase/trans-out-orders/check-editable",
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
			toast.error(Errors.getMessage("編輯檢查失敗", err));
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	// const depOrdersDisabled = useMemo(() => {
	// 	return !!crud.itemData?.GinID;
	// }, [crud.itemData?.GinID]);

	const handleDepOrdersChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				if (newValue.length === 0) {
					prodGrid.handleGridDataLoaded([]);
					return;
				}

				console.log("handleDepOrdersChanged", newValue);
				const formData = getValues();
				console.log("formData", formData);
				const collected = C08.transformForSubmitting(
					formData,
					prodGrid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/trans-out-orders/load-prods",
						bearer: token,
						data: collected,
					});
					console.log("load-prods.payload", payload);
					if (status.success) {
						const data = C08.transformForReading(payload.data[0]);
						console.log("refreshed data", data);
						prodGrid.handleGridDataLoaded(data.prods);
						refreshAmt({ setValue, data, gridData: data.prods });
						// toast.info("訂購單商品已載入");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入訂購單商品失敗", err));
				}
			},
		[httpPostAsync, prodGrid, refreshAmt, token]
	);

	const handleTxiDeptChanged = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("handleTxiDeptChanged", newValue);

				setValue("depOrders", []);
			},
		[]
	);

	const sqtyDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const dtypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const stypeDisabled = useCallback(
		({ rowData }) => {
			return !rowData.prod || !!crud.itemData?.depOrders?.length > 0;
		},
		[crud.itemData?.depOrders?.length]
	);

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	const sprodDisabled = useCallback(({ rowData }) => {
		return !!rowData?.SOrdFlag_N;
	}, []);

	// 挑戰處理

	const stockPwordAction = useAction();

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
		handleGridChange,
		getRowKey,
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		isSupplierNameDisabled,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		refreshWorking: refreshAction.working,
		handleDepOrdersChanged,
		handleTxiDeptChanged,
		stypeDisabled,
		dtypeDisabled,
		sqtyDisabled,
		getSPriceClassName,
		sprodDisabled,
		loadStockPword,
		handleGridSelectionChange,
	};
};
