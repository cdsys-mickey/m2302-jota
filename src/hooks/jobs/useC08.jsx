import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C08 from "@/modules/md-c08";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { useAppModule } from "./useAppModule";

import { useToggle } from "@/shared-hooks/useToggle";
import { nanoid } from "nanoid";
import { useSideDrawer } from "../useSideDrawer";

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
	// 側邊欄
	const sideDrawer = useSideDrawer();

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
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/trans-out-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const grid = useDSG({
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
			SPrice: "",
			SRemark: "",
			ChkQty: "",
			SOrdID: "",
			stype: null,
			dtype: null,
			overrideSQty: null
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: grid.fillRows({ createRow }),
			TxoDate: new Date(),
			RecvAmt: "",
			taxExcluded: false,
			employee: null,
			supplier: null,
			depOrders: [],
		};
		crud.promptCreating({ data });
		qtyMap.clear();
		grid.initGridData(data.prods);
	}, [createRow, crud, grid, qtyMap]);

	const loadStockMap = useCallback(
		async (
			data,
			opts = {
				mark: false,
			}
		) => {
			const gridData = data || grid.gridData;

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
						grid.setGridData(newGridData);
					}
					console.log("qtyMap:", qtyMap);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("取得庫存失敗", err));
			}
		},
		[calcProdStock, httpGetAsync, grid, qtyMap, token]
	);

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
					grid.initGridData(data.prods);
					loadStockMap(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, loadStockMap, grid, token]
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

	const overrideSQtyDisabled = useCallback(({ rowData }) => {
		return !rowData.sqtyError;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);

	const commitSQty = useCallback(
		({ setValue, gridMeta }) => {
			const sqtyLock = sqtyLockRef.current;
			// 置換

			const newRowData = {
				SQty: sqtyLock.demand,
				SAmt:
					!sqtyLock.price || !sqtyLock.demand
						? ""
						: sqtyLock.stype?.id
							? 0
							: sqtyLock.price * sqtyLock.demand,
				overrideSQty: true,
			};
			console.log("commitSQty", newRowData);

			grid.setValueByRowIndex(sqtyLock.rowIndex, newRowData);
			const newGridData = [...grid.gridData];
			newGridData[sqtyLock.rowIndex] = newRowData;

			const total = C08.getTotal(newGridData);
			setValue("TxoAmt", total.toFixed(2));

			gridMeta.setActiveCell({
				col: "SQty",
				row: sqtyLock.rowIndex,
			});
			sqtyLockRef.current = null;
		},
		[grid]
	);

	/**
	 * 確認強迫銷貨
	 */
	const promptOverrideSQty = useCallback(
		({ setValue, gridMeta }) => {
			const sqtyLock = sqtyLockRef.current;
			dialogs.confirm({
				message: `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock})，是否強迫銷貨？`,
				onConfirm: () => {
					commitSQty({ setValue, gridMeta });
				},
				onCancel: () => {
					console.log("sqty cancelled");
					gridMeta.setActiveCell({
						col: "SQty",
						row: sqtyLock.rowIndex,
					});
				},
				closeOthers: true,
			});
		},
		[commitSQty, dialogs]
	);

	const promptPwordEntry = useCallback(
		({ promptOverrideSQty, setValue, first = true, gridMeta }) => {
			console.log("promptPwordEntry, first:", first);
			const sqtyLock = sqtyLockRef.current;
			const pwordLock = pwordLockRef.current;
			dialogs.prompt({
				title: "庫存不足",
				message: first
					? `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock}), 請輸入密碼`
					: "密碼錯誤，請再次輸入或取消",
				label: "強迫銷貨密碼",
				triggerCancelOnClose: true,
				disableCloseOnConfirm: true,
				closeOthers: !first,
				onConfirm: (value) => {
					if (value === pwordLock.value) {
						console.log("pword passed");
						pwordLockRef.current = {
							...pwordLockRef.current,
							passed: true,
						};
						dialogs.closeLatest();
						promptOverrideSQty({ setValue, gridMeta });
					} else {
						// dialogs.closeLatest();
						console.log("pword not passed");
						toast.error("密碼錯誤, 請重新輸入");
						promptPwordEntry({
							promptOverrideSQty,
							setValue,
							first: false,
							gridMeta
						});
					}
				},
				onCancel: () => {
					console.log("pword cancelled");
					gridMeta.setActiveCell({
						col: "SQty",
						row: sqtyLock.rowIndex,
					});
				},
				// confirmText: "通過",
			});
		},
		[dialogs]
	);

	const handleOverrideSQty = useCallback(
		({ setValue, gridMeta }) => {
			const pwordLock = pwordLockRef.current;
			// 1.如果通過密碼判定(stockPwordPassedRef.current), 則直接跳確認
			gridMeta.setActiveCell(null);
			if (!pwordLock?.passed) {
				promptPwordEntry({ promptOverrideSQty, setValue, gridMeta });
				return;
			}
			promptOverrideSQty({ setValue, gridMeta });
		},
		[promptOverrideSQty, promptPwordEntry]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData, txiDeptId }) => {
			const { prod } = rowData;

			const prodInfo = prod?.ProdID ? await getProdInfo(prod?.ProdID, {
				txiDeptId,
			}) : null;
			// 取得報價
			qtyMap.set(prod.ProdID, prodInfo.Stock);
			console.log("qtyMap updated", qtyMap);
			rowData = {
				...rowData,
				["prod"]: prodInfo?.Price ? rowData.prod : null,
				["ProdData"]: prod?.ProdData || "",
				["PackData_N"]: prod?.PackData_N || "",
				["SQty"]: "",
				["overrideSQty"]: false,
				["dtype"]: null,
				["stype"]: null,
				["SPrice"]: prodInfo?.Price || "",
				// SMsg: `庫存為 ${prodInfo.Stock}`,
				["StockQty_N"]: prodInfo?.Stock || "",
			};
			if (prod && !prodInfo?.Price) {
				toast.error("商品未訂調撥成本，不得訂購", {
					position: "top-center",
				});
			}
			return rowData;
		},
		[getProdInfo, qtyMap]
	);

	const handleGridSQtyChange = useCallback(
		({ rowData, rowIndex, setValue, gridData, gridMeta }) => {
			if (!rowData.prod) {
				return rowData;
			}

			const prodStock = calcProdStock({
				rowIndex,
				prodId: rowData.prod.ProdID,
				gridData,
			});

			sqtyLockRef.current = {
				rowIndex: rowIndex,
				prod: rowData.prod,
				demand: rowData.SQty,
				price: rowData.SPrice,
				stype: rowData.stype,
				stock: prodStock,
			};

			if (rowData.SQty > 0 && prodStock < rowData.SQty) {
				rowData = {
					...rowData,
					["SQty"]: 0,
				};

				handleOverrideSQty({ setValue, gridMeta });
			} else {
				rowData = {
					...rowData,
					// ["SQtyNote"]: "",
					overrideSQty: false,
					sqtyError: false,
				};
			}
			return rowData;
		},
		[calcProdStock, handleOverrideSQty]
	);

	const handleGridOverrideSQtyChange = useCallback(({ rowData }) => {
		rowData = {
			...rowData,
			...(rowData.overrideSQty && {
				sqtyError: false,
			}),
		};
		return rowData;
	}, []);

	const handleGridSPriceChange = useCallback(({ rowData }) => {
		// 計算合計
		rowData = {
			...rowData,
			["SAmt"]:
				!rowData.SPrice || !rowData.SQty
					? ""
					: rowData.stype?.id
						? 0
						: rowData.SPrice * rowData.SQty,
		};
		return rowData;
	}, []);

	const updateGridRow = useCallback(({ fromIndex, formData, newValue, setValue, gridMeta }) => async (rowData, index) => {
		const rowIndex = fromIndex + index;
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
					rowData: processedRowData,
					txiDeptId: formData.txiDept.DeptID,
				});
		}

		// 數量, 且有選 prod
		if (rowData.SQty !== oldRowData.SQty) {
			processedRowData = handleGridSQtyChange({
				rowData: processedRowData,
				gridData: newValue,
				rowIndex,
				setValue,
				gridMeta
			});
		}

		// 單價, 贈,  數量, 改用 sqty
		if (
			rowData.SPrice !== oldRowData.SPrice ||
			processedRowData.SQty !== oldRowData.SQty ||
			rowData.stype?.id !== oldRowData.stype?.id
		) {
			processedRowData = handleGridSPriceChange({
				rowData: processedRowData,
			});
		}

		// 強迫銷貨
		if (
			rowData.overrideSQty !==
			oldRowData.overrideSQty
		) {
			processedRowData =
				handleGridOverrideSQtyChange({
					rowData: processedRowData,
				});
		}
		return processedRowData;
	}, [grid.gridData, handleGridOverrideSQtyChange, handleGridProdChange, handleGridSPriceChange, handleGridSQtyChange]);

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue, gridMeta }) =>
			async (newValue, operations) => {
				const formData = getValues();
				console.log("buildGridChangeHandler", operations);
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
											fromIndex: operation.fromRowIndex,
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
						// 					rowData: processedRowData,
						// 					txiDeptId: formData.txiDept.DeptID,
						// 				});
						// 		}

						// 		// 數量, 且有選 prod
						// 		if (rowData.SQty !== oldRowData.SQty) {
						// 			processedRowData = handleGridSQtyChange({
						// 				rowData: processedRowData,
						// 				gridData: newValue,
						// 				rowIndex,
						// 				setValue,
						// 			});
						// 		}

						// 		// 單價, 贈,  數量, 改用 sqty
						// 		if (
						// 			rowData.SPrice !== oldRowData.SPrice ||
						// 			processedRowData.SQty !== oldRowData.SQty ||
						// 			rowData.stype?.id !== oldRowData.stype?.id
						// 		) {
						// 			processedRowData = handleGridSPriceChange({
						// 				rowData: processedRowData,
						// 			});
						// 		}

						// 		// 強迫銷貨
						// 		if (
						// 			rowData.overrideSQty !==
						// 			oldRowData.overrideSQty
						// 		) {
						// 			processedRowData =
						// 				handleGridOverrideSQtyChange({
						// 					rowData: processedRowData,
						// 				});
						// 		}
						// 		newGridData[rowIndex] = processedRowData;
						// 	});
					} else if (operation.type === "DELETE") {
						// do nothing now
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					grid.setGridData(newGridData);
					refreshAmt({ setValue, gridData: newGridData });
				}
			},
		[updateGridRow, grid, refreshAmt]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			console.log("prodGrid.gridData", grid.gridData);
			const collected = C08.transformForSubmitting(
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
				JobName: "C08",
				IDs: crud.itemData?.TxoID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC08Rep.aspx?LogKey=${operator?.LogKey
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

	const checkAndRemoveDepOrders = useCallback(
		({ gridData, message, setValue, newOrders }) => {
			if (message) {
				toast.warn(message, {
					position: "top-center",
				});
			}

			const ordIds = [...new Set(gridData.map((item) => item.ordId))];
			const filteredOrders = newOrders.filter((order) =>
				ordIds.includes(order["訂貨單號"])
			);

			if (filteredOrders.length < newOrders.length) {
				setValue("depOrders", filteredOrders);

				const filteredOutOrdIds = newOrders
					.filter((order) => !ordIds.includes(order["訂貨單號"]))
					.map((order) => order["訂貨單號"]);

				toast.warn(
					`訂貨單號 ${filteredOutOrdIds.join(", ")} 已同步移除`,
					{
						position: "top-center",
					}
				);
			}
		},
		[]
	);

	const handleDepOrdersChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				if (newValue.length === 0) {
					if (crud.creating) {
						grid.setGridData(
							grid.fillRows({ createRow, data: [] })
						);
					} else {
						grid.setGridData([]);
					}
					return;
				}

				console.log("handleDepOrdersChanged", newValue);
				const formData = getValues();
				console.log("formData", formData);
				const collected = C08.transformForSubmitting(
					formData,
					grid.gridData
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
						grid.setGridData(
							grid.fillRows({ createRow, data: data.prods }),
							{
								supressEvents: true
							}
						);
						refreshAmt({ setValue, data, gridData: data.prods });
						// toast.info("訂購單商品已載入");
						checkAndRemoveDepOrders({
							gridData: data.prods,
							message: payload.ErrorMsg,
							setValue,
							newOrders: newValue,
						});
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入訂購單商品失敗", err));
				}
			},
		[grid, crud.creating, createRow, httpPostAsync, token, refreshAmt, checkAndRemoveDepOrders]
	);

	const handleTxiDeptChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				const formData = getValues();
				// 若有 depOrders 則完全清空
				if (formData.depOrders?.length > 0 || newValue == null) {
					console.log("handleTxiDeptChanged", newValue);
					setValue("depOrders", []);
					grid.setGridData(grid.fillRows({ createRow }));
				} else {
					// 若沒有 depOrders 則 refresh-grid
					const collected = C08.transformForSubmitting(
						formData,
						grid.gridData
					);
					console.log("collected", collected);
					try {
						const { status, payload, error } = await httpPostAsync({
							url: "v1/purchase/trans-out-orders/refresh-grid",
							bearer: token,
							data: collected,
						});
						if (status.success) {
							const data = C08.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							grid.setGridData(
								grid.fillRows({
									createRow,
									data: data.prods,
								})
							);
							refreshAmt({ setValue, gridData: data.prods });
							// toast.info("商品單價已更新");
						} else {
							throw error || new Error("未預期例外");
						}
					} catch (err) {
						toast.error(Errors.getMessage("商品單價更新失敗", err));
					}
				}
			},
		[createRow, httpPostAsync, grid, refreshAmt, token]
	);

	const sqtyDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const dtypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const stypeDisabled = useCallback(
		({ rowData }) => {
			return !rowData.prod || !!crud.itemData?.txoOrders?.length > 0;
		},
		[crud.itemData?.txoOrders?.length]
	);

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	const getSQtyClassName = useCallback(({ rowData }) => {
		return rowData.sqtyError && !rowData.overrideSqty ? "red" : null;
	}, []);

	const sprodDisabled = useCallback(({ rowData }) => {
		return !!rowData?.SOrdFlag_N;
	}, []);

	// 挑戰處理

	// const [sordId, setSOrdId] = useState();
	// const [depOrderInfo, setDepOrderInfo] = useState();
	// const loadDepOrderInfoAction = useAction();

	// const loadDepOrderInfo = useCallback(
	// 	async ({ txiDeptId, newId }) => {
	// 		if (txiDeptId && sordId !== newId) {
	// 			if (!sordId) {
	// 				setDepOrderInfo(null);
	// 				setSOrdId(null);
	// 				return;
	// 			}
	// 			try {
	// 				loadDepOrderInfoAction.start();
	// 				const { status, payload, error } = await httpGetAsync({
	// 					url: "v1/purchase/trans-out-orders/ord-info",
	// 					bearer: token,
	// 					params: {
	// 						id: sordId,
	// 						ind: txiDeptId,
	// 					},
	// 				});
	// 				if (status.success) {
	// 					console.log("payload", payload);
	// 					loadDepOrderInfoAction.finish();
	// 					setDepOrderInfo(payload);
	// 				} else {
	// 					throw error || new Error("發生未預期例外");
	// 				}
	// 			} catch (err) {
	// 				toast.error(Errors.getMessage("讀取訂單資訊失敗", err));
	// 				loadDepOrderInfoAction.fail(err);
	// 			}
	// 		}
	// 	},
	// 	[httpGetAsync, loadDepOrderInfoAction, sordId, token]
	// );

	// const sordIdRef = useRef(null);

	// const getRowClassName = useCallback(
	// 	({ rowData }) => {
	// 		let sordId = null;
	// 		if (grid.isRowSelected({ rowData })) {
	// 			sordId = rowData?.SOrdID;
	// 			if (sordIdRef.current !== sordId) {
	// 				console.log(`sordId →`, sordId);
	// 				sordIdRef.current = sordId;
	// 			}
	// 		}
	// 	},
	// 	[grid]
	// );

	const handleGridCellFocusChange = useCallback(({ cell }) => {
		console.log("focus", cell);
	}, []);

	// const getSOrdId = useCallback(() => {
	// 	return sordIdRef.current;
	// }, []);

	const getTooltip = useCallback((rowData) => {
		let results = [];
		// if (rowData?.StockQty_N !== null && rowData?.StockQty_N !== undefined) {
		// 	results.push(`庫存: ${rowData?.StockQty_N || "0"}`);
		// }
		if (rowData?.ordId !== null && rowData?.ordId !== undefined) {
			results.push(`訂單: ${rowData?.ordId || "(空白)"}`);
		}

		if (rowData?.OrdQty_N !== null && rowData?.OrdQty_N !== undefined) {
			results.push(`訂貨量: ${rowData?.OrdQty_N || "0"}`);
		}
		if (
			rowData?.OrdNotQty_N !== null &&
			rowData?.OrdNotQty_N !== undefined
		) {
			results.push(`未出量: ${rowData?.OrdNotQty_N || "0"}`);
		}
		if (
			rowData?.OrdRemark_N !== null &&
			rowData?.OrdRemark_N !== undefined
		) {
			results.push(`備註: ${rowData?.OrdRemark_N || "(空白)"}`);
		}

		return results.join(", ");
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
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		refreshWorking: refreshAction.working,
		handleDepOrdersChanged,
		handleTxiDeptChanged,
		stypeDisabled,
		dtypeDisabled,
		sqtyDisabled,
		overrideSQtyDisabled,
		getSPriceClassName,
		getSQtyClassName,
		sprodDisabled,
		loadStockPword,
		// 門市訂單資訊
		// depOrderInfo,
		// loadDepOrderInfoWorking: loadDepOrderInfoAction.working,
		// getSOrdId,
		handleGridCellFocusChange,
		// getRowClassName,
		getTooltip,
		...sideDrawer
	};
};
