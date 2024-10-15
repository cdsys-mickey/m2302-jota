import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import D01 from "@/modules/md-d01";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useToggle } from "../../shared-hooks/useToggle";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";
import useOverrideSQty from "../useOverrideSQty";

const DEFAULT_ROWS = 10;

export const useD01 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "D01",
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
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/material/picking-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const [expState, setExpState] = useState({
		expProd: null,
		expDate: null,
		expPrompting: false,
	});

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const overrideSQty = useOverrideSQty({
		grid,
	});
	const { committed } = overrideSQty;

	// 挑戰
	// const pwordLockRef = useRef(null);
	// const sqtyLockRef = useRef(null);

	// const loadStockPword = useCallback(async () => {
	// 	try {
	// 		const { status, payload, error } = await httpGetAsync({
	// 			url: `v1/ou/dept/params`,
	// 			bearer: token,
	// 			params: {
	// 				id: "StockPword",
	// 				dc: 1,
	// 			},
	// 		});
	// 		if (status.success) {
	// 			pwordLockRef.current = {
	// 				value: payload,
	// 				passed: false,
	// 			};
	// 		} else {
	// 			throw error || new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		toast.error(Errors.getMessage("讀取設定發生錯誤", err), {
	// 			position: "top-center"
	// 		});
	// 	}
	// }, [httpGetAsync, token]);

	// const calcProdStock = useCallback(
	// 	({ prodId, rowIndex, gridData }) => {
	// 		const totalSQty = gridData
	// 			.filter((item) => item.prod)
	// 			.filter(
	// 				(item, index) =>
	// 					item.prod.ProdID === prodId && index < rowIndex
	// 			)
	// 			.reduce((sum, item) => sum + parseFloat(item.SQty), 0);
	// 		const stock = qtyMap.get(prodId) || 0;
	// 		return stock - totalSQty;
	// 	},
	// 	[qtyMap]
	// );

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			stype: null,
			SQtyNote: "",
			SQty: "",
			SPrice: "",
			ChkQty: "",
			SOrdID: "",
			SExpDate: null,
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: grid.fillRows({ createRow }),
			OutDate: new Date(),
		};
		crud.promptCreating({ data });
		grid.handleGridDataLoaded(data.prods);
	}, [createRow, crud, grid]);

	// const loadStockMap = useCallback(
	// 	async (
	// 		data,
	// 		opts = {
	// 			mark: false,
	// 		}
	// 	) => {
	// 		const gridData = data || grid.gridData;

	// 		if (!gridData || gridData.length === 0) {
	// 			return;
	// 		}
	// 		const prodIds = [
	// 			...new Set(
	// 				gridData
	// 					.filter((item) => item.prod?.ProdID)
	// 					.map((item) => item.prod.ProdID)
	// 			),
	// 		];
	// 		try {
	// 			const { status, payload, error } = await httpGetAsync({
	// 				url: "v1/inventory/stock-map",
	// 				bearer: token,
	// 				params: {
	// 					id: prodIds.join(","),
	// 				},
	// 			});
	// 			if (status.success) {
	// 				payload.Stock?.map((x) =>
	// 					qtyMap.set(x.ProdID, Number(x.Qty))
	// 				);
	// 				if (opts.mark) {
	// 					let newGridData = [...gridData];
	// 					gridData.forEach((rowData, rowIndex) => {
	// 						const prodId = rowData.prod.ProdID;
	// 						const sqty = Number(rowData.SQty);
	// 						const prodStock = calcProdStock({
	// 							rowIndex,
	// 							prodId,
	// 							gridData,
	// 						});
	// 						newGridData[rowIndex] = {
	// 							...rowData,
	// 							["StockQty_N"]: (
	// 								qtyMap.get(prodId) || 0
	// 							).toFixed(2),
	// 							sqtyError: sqty > prodStock,
	// 						};
	// 					});
	// 					grid.setGridData(newGridData);
	// 				}
	// 				console.log("qtyMap:", qtyMap);
	// 			} else {
	// 				throw error || new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			toast.error(Errors.getMessage("取得庫存失敗", err), {
	// 				position: "top-center"
	// 			});
	// 		}
	// 	},
	// 	[calcProdStock, httpGetAsync, grid, qtyMap, token]
	// );



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
					url: "v1/material/picking-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = D01.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					overrideSQty.loadStockMap(data.prods);
					// setSelectedInq(data);

					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[httpGetAsync, token, crud, overrideSQty, grid]
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
					url: "v1/material/picking-orders",
					data: data,
					bearer: token,
				}) : await httpPutAsync({
					url: "v1/material/picking-orders",
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
				console.error(`${creating ? "新增" : "修改"} 失敗`, err);
				if (err.code === 102) {
					const rowIndex = Number(err.data.Row) - 1;
					const rowData = grid.gridData[rowIndex];
					const stock = Number(err.data.StockQty);

					overrideSQty.handleOverrideSQty({
						setValue, gridMeta, formData: data, rowData, rowIndex, stock, submitAfterCommitted: true
					});
					// loadStockMap(data.prods, { mark: true });
					// toast.error("部分商品庫存不足，請調整後再送出", {
					// 	position: "top-center"
					// });
				} else {
					toast.error(Errors.getMessage("新增失敗", err), {
						position: "top-center"
					});
				}
			}
		},
		[crud, grid.gridData, httpPostAsync, httpPutAsync, listLoader, loadItem, overrideSQty, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.領料單號 });
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

	// // UPDATE
	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/material/picking-orders",
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
	// 			console.error("handleCreate.failed", err);
	// 			toast.error(Errors.getMessage("修改失敗", err), {
	// 				position: "top-center"
	// 			});
	// 		}
	// 	},
	// 	[crud, httpPutAsync, listLoader, loadItem, token]
	// );

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除領料單「${itemData?.OutID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/material/picking-orders`,
						bearer: token,
						params: {
							id: itemData?.OutID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除領料單 ${itemData?.OutID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err), {
						position: "top-center"
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
				params: D01.transformAsQueryParams(data),
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

	const purchaseOrdersDisabled = useMemo(() => {
		return !!crud.itemData?.OutID;
	}, [crud.itemData?.OutID]);

	const prodDisabled = useCallback(({ rowData }) => {
		return !!rowData.ordId;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag || !!rowData.stype;
	}, []);

	// const recoverActiveCell = useCallback(({ gridMeta }) => {
	// 	if (sqtyLockRef.current !== undefined && sqtyLockRef.current !== null) {
	// 		gridMeta.setActiveCell({
	// 			col: "SQty",
	// 			row: sqtyLockRef.current?.rowIndex,
	// 		});
	// 	} else {
	// 		console.warn("sqtyLockRef is null");
	// 	}
	// }, []);

	// const commitSQty = useCallback(
	// 	({ gridMeta }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		// 置換

	// 		const newRowData = {
	// 			SQty: sqtyLock.demand,
	// 			SQtyNote: "*",
	// 		};
	// 		console.log("commitSQty", newRowData);

	// 		grid.setValueByRowIndex(sqtyLock.rowIndex, newRowData);
	// 		const newGridData = [...grid.gridData];
	// 		newGridData[sqtyLock.rowIndex] = newRowData;

	// 		gridMeta.setActiveCell({
	// 			col: "SQty",
	// 			row: sqtyLock.rowIndex,
	// 		});
	// 		sqtyLockRef.current = null;
	// 	},
	// 	[grid]
	// );

	// /**
	//  * 確認強迫銷貨
	//  */
	// const promptOverrideSQty = useCallback(
	// 	({ gridMeta }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		dialogs.confirm({
	// 			message: `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock})，是否強迫銷貨？`,
	// 			onConfirm: () => {
	// 				commitSQty({ gridMeta });
	// 			},
	// 			onCancel: () => {
	// 				console.log("pword cancelled");
	// 				// prodGrid.setActiveCell({
	// 				// 	col: "SQty",
	// 				// 	row: sqtyLock.rowIndex,
	// 				// });
	// 				recoverActiveCell({ gridMeta });
	// 			},
	// 			onClose: () => {
	// 				recoverActiveCell({ gridMeta })
	// 			},
	// 			closeOthers: true,
	// 		});
	// 	},
	// 	[commitSQty, dialogs, recoverActiveCell]
	// );

	// const promptPwordEntry = useCallback(
	// 	({ promptOverrideSQty, setValue, gridMeta, first = true }) => {
	// 		console.log("promptPwordEntry, first:", first);
	// 		const sqtyLock = sqtyLockRef.current;
	// 		const pwordLock = pwordLockRef.current;
	// 		dialogs.confirm({
	// 			title: "庫存不足",
	// 			message: first
	// 				? `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock}), 請輸入密碼`
	// 				: "密碼錯誤，請再次輸入或取消",
	// 			label: "強迫銷貨密碼",
	// 			triggerCancelOnClose: true,
	// 			disableCloseOnConfirm: true,
	// 			closeOthers: !first,
	// 			onConfirm: (value) => {
	// 				if (value === pwordLock.value) {
	// 					console.log("pword passed");
	// 					pwordLockRef.current = {
	// 						...pwordLockRef.current,
	// 						passed: true,
	// 					};
	// 					// dialogs.closeLatest();
	// 					promptOverrideSQty({ gridMeta });
	// 				} else {
	// 					// dialogs.closeLatest();
	// 					console.log("pword not passed");
	// 					toast.error("密碼錯誤, 請重新輸入", {
	// 						position: "top-center"
	// 					});
	// 					promptPwordEntry({
	// 						promptOverrideSQty,
	// 						setValue,
	// 						gridMeta,
	// 						first: false,
	// 					});
	// 				}
	// 			},
	// 			onCancel: () => {
	// 				console.log("pword cancelled");
	// 				// prodGrid.setActiveCell({
	// 				// 	col: "SQty",
	// 				// 	row: sqtyLock.rowIndex,
	// 				// });
	// 				recoverActiveCell({ gridMeta });
	// 			},
	// 			onClose: () => {
	// 				recoverActiveCell({ gridMeta })
	// 			},
	// 			// confirmText: "通過",
	// 		});
	// 	},
	// 	[dialogs, recoverActiveCell]
	// );

	// const handleOverrideSQty = useCallback(
	// 	({ setValue, gridMeta }) => {
	// 		const pwordLock = pwordLockRef.current;
	// 		// 1.如果通過密碼判定(stockPwordPassedRef.current), 則直接跳確認
	// 		gridMeta.setActiveCell(null);
	// 		if (!pwordLock?.passed) {
	// 			promptPwordEntry({ promptOverrideSQty, setValue, gridMeta });
	// 			return;
	// 		}
	// 		promptOverrideSQty({ gridMeta });
	// 	},
	// 	[promptOverrideSQty, promptPwordEntry]
	// );

	const handleGridProdChange = useCallback(
		async ({ rowData, rowIndex, newValue }) => {
			const { prod } = rowData;

			const prodRowIndex = rowData.prod?.ProdID ? D01.findProdIndex({
				newValue,
				rowData,
				rowIndex,
			}) : -1;

			const found = rowData.prod?.ProdID && prodRowIndex !== -1;

			// 檢查是否已存在
			if (found) {
				toast.error(
					`「${prod.ProdID} / ${prod.ProdData}」已存在於第 ${prodRowIndex + 1
					} 筆, 請重新選擇`,
					{
						position: "top-center",
					}
				);
			} else if (rowData.prod) {
				// qtyMap.set(prod.ProdID, prod.StockQty);
				overrideSQty.setStockQty(prod.ProdID, prod.StockQty);
			}

			rowData = {
				...rowData,
				prod: (found || !rowData.prod) ? null : rowData.prod,
				["ProdData"]: found ? "" : rowData.prod?.ProdData,
				["PackData_N"]: found ? "" : prod?.PackData_N || "",
				["StockQty_N"]: found ? "" : prod?.StockQty || "",
				["SQty"]: "",
				["SExpDate"]: "",
				["SQtyNote"]: ""
			};
			return rowData;
		},
		[overrideSQty]
	);

	// const handleGridSQtyChange = useCallback(
	// 	({ rowData, rowIndex, setValue, gridData, gridMeta }) => {
	// 		if (!rowData.prod) {
	// 			return rowData;
	// 		}

	// 		const prodStock = calcProdStock({
	// 			rowIndex,
	// 			prodId: rowData.prod.ProdID,
	// 			gridData,
	// 		});

	// 		sqtyLockRef.current = {
	// 			rowIndex: rowIndex,
	// 			prod: rowData.prod,
	// 			demand: rowData.SQty,
	// 			price: rowData.SPrice,
	// 			stype: rowData.stype,
	// 			stock: prodStock,
	// 		};

	// 		if (prodStock < rowData.SQty && rowData.SQty > 0) {
	// 			rowData = {
	// 				...rowData,
	// 				["SQty"]: 0,
	// 			};

	// 			handleOverrideSQty({ setValue, gridMeta });
	// 		} else {
	// 			rowData = {
	// 				...rowData,
	// 				["SQtyNote"]: "",
	// 				sqtyError: false,
	// 			};
	// 		}
	// 		return rowData;
	// 	},
	// 	[calcProdStock, handleOverrideSQty]
	// );

	// const handleGridOverrideSQtyChange = useCallback(({ rowData }) => {
	// 	rowData = {
	// 		...rowData,
	// 		...(rowData.overrideSQty && {
	// 			sqtyError: false,
	// 		}),
	// 	};
	// 	return rowData;
	// }, []);

	const onUpdateRow = useCallback(({ fromIndex, setValue, newValue, gridMeta }) => async (rowData, index) => {
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
					rowIndex,
					rowData: processedRowData,
					newValue,
				});
		}

		// 數量, 且有選 prod
		if (rowData.SQty !== oldRowData.SQty) {
			processedRowData = overrideSQty.handleGridSQtyChange({
				rowData: processedRowData,
				gridData: newValue,
				rowIndex,
				setValue,
				gridMeta,
			});
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange, overrideSQty]);

	// const buildGridChangeHandler = useCallback(
	// 	({ getValues, setValue, gridMeta }) =>
	// 		async (newValue, operations) => {
	// 			const formData = getValues();
	// 			console.log("buildGridChangeHandler", operations);
	// 			console.log("newValue", newValue);
	// 			const newGridData = [...newValue];
	// 			let checkFailed = false;
	// 			for (const operation of operations) {
	// 				if (operation.type === "UPDATE") {
	// 					const updatedRows = await Promise.all(
	// 						newValue
	// 							.slice(
	// 								operation.fromRowIndex,
	// 								operation.toRowIndex
	// 							)
	// 							.map(async (item, index) => {
	// 								const updatedRow = await updateGridRow({
	// 									formData,
	// 									fromIndex: operation.fromRowIndex,
	// 									setValue,
	// 									newValue,
	// 									gridMeta
	// 								})(item, index);
	// 								return updatedRow;
	// 							})
	// 					)
	// 					console.log("updatedRows", updatedRows);

	// 					newGridData.splice(
	// 						operation.fromRowIndex,
	// 						updatedRows.length,
	// 						...updatedRows
	// 					)
	// 					// newValue
	// 					// 	.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					// 	.forEach(async (rowData, i) => {
	// 					// 		const rowIndex = operation.fromRowIndex + i;
	// 					// 		const oldRowData = grid.gridData[rowIndex];

	// 					// 		let processedRowData = { ...rowData };
	// 					// 		// 商品
	// 					// 		if (
	// 					// 			rowData.prod?.ProdID !==
	// 					// 			oldRowData.prod?.ProdID
	// 					// 		) {
	// 					// 			processedRowData =
	// 					// 				await handleGridProdChange({
	// 					// 					rowIndex,
	// 					// 					rowData: processedRowData,
	// 					// 					newValue,
	// 					// 				});
	// 					// 		}

	// 					// 		// 數量, 且有選 prod
	// 					// 		if (rowData.SQty !== oldRowData.SQty) {
	// 					// 			processedRowData = handleGridSQtyChange({
	// 					// 				rowData: processedRowData,
	// 					// 				gridData: newValue,
	// 					// 				rowIndex,
	// 					// 				setValue,
	// 					// 			});
	// 					// 		}

	// 					// 		// 強迫銷貨
	// 					// 		// if (
	// 					// 		// 	rowData.overrideSQty !==
	// 					// 		// 	oldRowData.overrideSQty
	// 					// 		// ) {
	// 					// 		// 	processedRowData =
	// 					// 		// 		handleGridOverrideSQtyChange({
	// 					// 		// 			rowData: processedRowData,
	// 					// 		// 		});
	// 					// 		// }
	// 					// 		newGridData[rowIndex] = processedRowData;
	// 					// 	});
	// 				} else if (operation.type === "DELETE") {
	// 					// do nothing now
	// 				} else if (operation.type === "CREATE") {
	// 					console.log("dsg.CREATE");
	// 					// process CREATE here
	// 					gridMeta.toFirstColumn({ nextRow: true });
	// 				}
	// 			}
	// 			console.log("prodGrid.changed", newGridData);
	// 			if (!checkFailed) {
	// 				grid.setGridData(newGridData);
	// 			}
	// 		},
	// 	[updateGridRow, grid]
	// );

	const onEditorSubmit = useCallback(
		({ setValue, gridMeta }) => (data) => {
			overrideSQty.setCommitted(false);
			console.log("onEditorSubmit", data);
			const collected = D01.transformForSubmitting(
				data,
				grid.gridData
			);
			console.log("collected", collected);
			handleSave({ data: collected, setValue, gridMeta });
			// if (crud.creating) {
			// 	handleCreate({ data: collected });
			// } else if (crud.updating) {
			// 	handleUpdate({ data: collected });
			// } else {
			// 	console.error("UNKNOWN SUBMIT TYPE");
			// }
		},
		[overrideSQty, grid.gridData, handleSave]
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
				JobName: "D01",
				IDs: crud.itemData?.OutID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebD01Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.OutID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	// 有效日期查詢
	const onExpDialogOpen = useCallback(() => {
		setExpState((prev) => ({
			...prev,
			expPrompting: true,
		}));
	}, []);

	const onExpDialogClose = useCallback(() => {
		setExpState((prev) => ({
			...prev,
			expPrompting: false,
		}));
	}, []);

	const onExpSubmit = useCallback((data) => {
		console.log("onExpSubmit", data);
		setExpState((prev) => ({
			...prev,
			expProd: data.expProd,
			expDate: data.expDate,
			expPrompting: false,
		}));
	}, []);

	const onExpSubmitError = useCallback((err) => {
		console.error("onExpSubmitError", err);
	}, []);

	const cancelExpChecking = useCallback(() => {
		setExpState({
			expProd: null,
			expDate: null,
			expPrompting: false,
		});
	}, []);

	const expChecking = useMemo(() => {
		return expState.expProd !== null;
	}, [expState.expProd]);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/material/picking-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.OutID,
				},
			});
			if (status.success) {
				crud.promptUpdating();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("編輯檢查失敗", err), {
				position: "top-center"
			});
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
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
		// buildGridChangeHandler,
		onUpdateRow,
		getRowKey,
		prodDisabled,
		purchaseOrdersDisabled,
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 有效日期查詢
		...expState,
		expChecking,
		onExpDialogOpen,
		onExpDialogClose,
		cancelExpChecking,
		onExpSubmit,
		onExpSubmitError,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// loadStockPword,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		...sideDrawer,
		committed
	};
};
