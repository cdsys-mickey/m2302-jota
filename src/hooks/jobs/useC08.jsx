import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C08 from "@/modules/md-c08";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useRef } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";

import ConfigContext from "@/contexts/config/ConfigContext";
import { toastEx } from "@/helpers/toast-ex";
import { useToggle } from "@/shared-hooks/useToggle";
import { nanoid } from "nanoid";
import useJotaReports from "../useJotaReports";
import usePwordCheck from "../usePwordCheck";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";

export const useC08 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "C08",
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
		url: "v1/purchase/trans-out-orders",
		bearer: token,
		initialFetchSize: 50,
	});

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
			// overrideSQty: null
			SQtyNote: ""
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		createRow
	});

	const sqtyManager = useSQtyManager({
		grid,
		action: "撥出"
	});
	const { committed } = sqtyManager;

	const pwordCheck = usePwordCheck()

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
	// 			throw error ?? new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		toastEx.error("讀取設定發生錯誤", err), {
	// 			position: "top-right"
	// 		});
	// 	}
	// }, [httpGetAsync, token]);

	const handleRefreshAmt = useCallback(
		({ setValue, formData, gridData, reset = false }) => {
			if (reset) {
				setValue("TxoAmt", "");
			} else {
				// if (formData) {
				// 	setValue("TxoAmt", formData?.TxoAmt);
				// 	return;
				// }

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

	// const calcProdStock = useCallback(
	// 	({ prodId, rowIndex, gridData }) => {
	// 		const totalSQty = gridData
	// 			.filter(
	// 				(item, index) =>
	// 					item.prod?.ProdID === prodId && index < rowIndex
	// 			)
	// 			.reduce((sum, item) => sum + parseFloat(item.SQty), 0);
	// 		const stock = qtyMap.get(prodId) || 0;
	// 		return stock - totalSQty;
	// 	},
	// 	[qtyMap]
	// );


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
		sqtyManager.reset();
		grid.initGridData(data.prods, {
			fillRows: true
		});
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
					sqtyManager.recoverStockMap(data.prods);
					grid.initGridData(data.prods);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[httpGetAsync, token, crud, sqtyManager, grid]
	);

	const handleSave = useCallback(
		async ({ data, setValue, gridMeta, overrideCheckDate = false }) => {
			const creating = crud.creating;
			try {
				if (creating) {
					crud.startCreating();
				} else {
					crud.startUpdating();
				}

				const { status, error } = creating ? await httpPostAsync({
					url: "v1/purchase/trans-out-orders",
					data: data,
					bearer: token,
					...(overrideCheckDate && {
						params: {
							override: 1
						}
					})
				}) : await httpPutAsync({
					url: "v1/purchase/trans-out-orders",
					data: data,
					bearer: token,
					...(overrideCheckDate && {
						params: {
							override: 1
						}
					})
				});
				if (status.success) {
					toastEx.success(creating ? `新增成功` : `修改成功`);
					if (creating) {
						crud.doneCreating();
						crud.cancelReading();
					} else {
						crud.doneUpdating();
						loadItem({ refresh: true });
					}
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
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

					sqtyManager.handleOverrideSQty({
						setValue, gridMeta, formData: data, rowData, rowIndex, stock, submitAfterCommitted: true, onCommit: ({ gridData }) => {
							handleRefreshAmt({
								gridData,
								setValue,
								formData: data
							})
						}
					});
				} else if (err.code == 20 && !overrideCheckDate) {
					// 日期檢查失敗
					pwordCheck.performCheck({
						title: err.message,
						callback: () => {
							handleSave({ data, setValue, gridMeta, overrideCheckDate: true })
						}
					})
				} else {
					toastEx.error("新增失敗", err);
				}
			}
		},
		[crud, grid.gridData, handleRefreshAmt, httpPostAsync, httpPutAsync, listLoader, loadItem, pwordCheck, sqtyManager, token]
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

	// // UPDATE
	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/purchase/trans-out-orders",
	// 				data: data,
	// 				bearer: token,
	// 			});
	// 			if (status.success) {
	// 				toastEx.success(`修改成功`);
	// 				crud.doneUpdating();
	// 				//crud.cancelReading();
	// 				loadItem({ refresh: true });
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error ?? new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failUpdating();
	// 			console.error("handleCreate.failed", err);
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
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除撥出單 ${itemData?.TxoID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
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
					txoDate: null,
					employee: null,
					deliveryEmployee: null,
					txiDept: null,
					transType: null
				});
			},
		[]
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
				toastEx.error("請先選擇商品", {
					position: "top-right"
				});
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
					sqtyManager.updateStockQty(prodId, payload.Stock);
					return payload;
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢調撥成本失敗", err);
			}
		},
		[httpGetAsync, sqtyManager, token]
	);

	const overrideSQtyDisabled = useCallback(({ rowData }) => {
		return !rowData.sqtyError;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SoFlag_N;
	}, []);

	const sprodDisabled = useCallback(({ rowData }) => {
		return !!rowData?.SOrdFlag_N;
	}, []);


	// const commitSQty = useCallback(
	// 	({ setValue, gridMeta }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		// 置換

	// 		const newRowData = {
	// 			SQty: sqtyLock.demand,
	// 			SAmt:
	// 				!sqtyLock.price || !sqtyLock.demand
	// 					? ""
	// 					: sqtyLock.stype?.id
	// 						? 0
	// 						: sqtyLock.price * sqtyLock.demand,
	// 			overrideSQty: true,
	// 		};
	// 		console.log("commitSQty", newRowData);

	// 		grid.spreadOnRow(sqtyLock.rowIndex, newRowData);
	// 		const newGridData = [...grid.gridData];
	// 		newGridData[sqtyLock.rowIndex] = newRowData;

	// 		const total = C08.getTotal(newGridData);
	// 		setValue("TxoAmt", total.toFixed(2));

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
	// 	({ setValue, gridMeta }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		dialogs.confirm({
	// 			message: `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock})，是否強迫銷貨？`,
	// 			onConfirm: () => {
	// 				commitSQty({ setValue, gridMeta });
	// 			},
	// 			onCancel: () => {
	// 				console.log("sqty cancelled");
	// 				gridMeta.setActiveCell({
	// 					col: "SQty",
	// 					row: sqtyLock.rowIndex,
	// 				});
	// 			},
	// 			closeOthers: true,
	// 		});
	// 	},
	// 	[commitSQty, dialogs]
	// );

	// const promptPwordEntry = useCallback(
	// 	({ promptOverrideSQty, setValue, first = true, gridMeta }) => {
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
	// 					dialogs.closeLatest();
	// 					promptOverrideSQty({ setValue, gridMeta });
	// 				} else {
	// 					// dialogs.closeLatest();
	// 					console.log("pword not passed");
	// 					toastEx.error("密碼錯誤, 請重新輸入", {
	// 						position: "top-right"
	// 					});
	// 					promptPwordEntry({
	// 						promptOverrideSQty,
	// 						setValue,
	// 						first: false,
	// 						gridMeta
	// 					});
	// 				}
	// 			},
	// 			onCancel: () => {
	// 				console.log("pword cancelled");
	// 				gridMeta.setActiveCell({
	// 					col: "SQty",
	// 					row: sqtyLock.rowIndex,
	// 				});
	// 			},
	// 			// confirmText: "通過",
	// 		});
	// 	},
	// 	[dialogs]
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
	// 		promptOverrideSQty({ setValue, gridMeta });
	// 	},
	// 	[promptOverrideSQty, promptPwordEntry]
	// );

	const handleGridProdChange = useCallback(
		async ({ rowData, txiDeptId }) => {
			let processedRowData = { ...rowData };

			const prodInfo = rowData.prod?.ProdID ? await getProdInfo(rowData.prod?.ProdID, {
				txiDeptId,
			}) : null;

			// D3 調撥成本只有判斷是否為空白, 若為 0 算是有填
			let transferPriceEmpty = !prodInfo?.Price;

			// 未設定調撥成本不可輸入
			if (processedRowData.prod && transferPriceEmpty) {
				toastEx.error(`「${processedRowData.prod?.ProdData}」未設定調撥成本不可輸入`);
			}

			processedRowData = {
				...processedRowData,
				["prod"]: transferPriceEmpty ? null : processedRowData.prod,
				["ProdData"]: transferPriceEmpty ? "" : processedRowData.prod?.ProdData || "",
				["PackData_N"]: transferPriceEmpty ? "" : processedRowData?.prod?.PackData_N || "",
				["SPrice"]: transferPriceEmpty ? "" : prodInfo?.Price,
				["SQty"]: "",
				["SQtyNote"]: "",
				["dtype"]: null,
				["stype"]: null,
				// SMsg: `庫存為 ${prodInfo.Stock}`,
				["StockQty_N"]: prodInfo?.Stock || "",
				["SAmt"]: ""
			};

			return processedRowData;
		},
		[getProdInfo]
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

	// 		if (rowData.SQty > 0 && prodStock < rowData.SQty) {
	// 			rowData = {
	// 				...rowData,
	// 				["SQty"]: 0,
	// 			};

	// 			handleOverrideSQty({ setValue, gridMeta });
	// 		} else {
	// 			rowData = {
	// 				...rowData,
	// 				// ["SQtyNote"]: "",
	// 				overrideSQty: false,
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

	const handleGridSPriceChange = useCallback(({ rowData }) => {
		// 計算合計
		let processedRowData = {
			...rowData,
		};
		processedRowData = {
			...processedRowData,
			["SAmt"]:
				!rowData.SPrice || !rowData.SQty
					? ""
					: rowData.stype?.id
						? 0
						: rowData.SPrice * rowData.SQty,
		};
		return processedRowData;
	}, []);



	const isRowDeletable = useCallback(({ key, rowData }) => {
		return !sprodDisabled({ rowData });
	}, [sprodDisabled]);

	const mapTooltip = useCallback(({ updateResult, prevGridData, gridData, rowIndex }) => {
		let targetProdID;
		if (updateResult?.type === "DELETE") {
			targetProdID = prevGridData[rowIndex]?.prod?.ProdID || '';
		} else {
			const targetRow = gridData[rowIndex];
			targetProdID = targetRow.prod?.ProdID;
			// 如果 targetProdID 為空，則使用 prevGridData 的 ProdID
			if (!targetProdID) {
				targetProdID = prevGridData[rowIndex]?.prod?.ProdID || '';
			}
		}

		// 若 targetProdID 仍為空，則不執行更新
		if (!targetProdID) {
			console.log("targetProdID 為空, 不執行 mapTooltip")
			return gridData;
		}

		// 計算其他符合條件列的 SQty 加總
		return gridData.map((row) => {
			if (row.prod?.ProdID === targetProdID) {
				if ((row.SNotQty && row.SNotQty <= 0) || (row.SOutQty && row.SOutQty != 0)) {
					return {
						...row,
						StockQty_N: "",
						// OrdQty_N: "",
						// LaveQty_N: "",
						tooltip: ""
					};
				}

				// const stock = sqtyManager.getStockQty(targetProdID);
				const stock = sqtyManager.getRemainingStock({ prodId: targetProdID, gridData });

				let processedRowData = {
					...row,
					StockQty_N: stock,
				};

				processedRowData = {
					...processedRowData,
					["tooltip"]: C08.getTooltip({
						rowData: processedRowData,
						rowIndex
					}),
				}

				return processedRowData;
			}
			return row; // 不符合條件則返回原本的列
		});
	}, [sqtyManager]);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};

		let dirty = false;
		// 商品
		if (
			rowData.prod?.ProdID !==
			oldRowData.prod?.ProdID
		) {
			updateResult.cols.push("prod")
			processedRowData =
				await handleGridProdChange({
					rowData: processedRowData,
					txiDeptId: formData.txiDept.DeptID,
				});
		}

		// 數量, 且有選 prod
		if (rowData.SQty !== oldRowData.SQty) {
			updateResult.cols.push("SQty")

			processedRowData = sqtyManager.handleGridSQtyChange({
				rowData: processedRowData,
				gridData: newValue,
				rowIndex,
				setValue,
				gridMeta,
				// 透過對話框等操作直接更新 SQty 不會觸發 GridChange, 所以必須帶上 onCommit 處理函式
				onCommit: ({ gridData }) => {
					handleRefreshAmt({
						gridData,
						setValue,
						formData
					});

					const updated = mapTooltip({ gridData, rowIndex })
					grid.setGridData(updated);
				}
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
			dirty = true;
			updateResult.cols.push("SAmt")
		}

		// 強迫銷貨
		// if (
		// 	rowData.overrideSQty !==
		// 	oldRowData.overrideSQty
		// ) {
		// 	processedRowData =
		// 		handleGridOverrideSQtyChange({
		// 			rowData: processedRowData,
		// 		});
		// 	updateResult.rows++;
		// }
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [grid, handleGridProdChange, handleGridSPriceChange, handleRefreshAmt, mapTooltip, sqtyManager]);

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
	// 					if (!grid.asyncRef.current.supressEvents) {
	// 						const updatedRows = await Promise.all(
	// 							newValue
	// 								.slice(
	// 									operation.fromRowIndex,
	// 									operation.toRowIndex
	// 								)
	// 								.map(async (item, index) => {
	// 									const updatedRow = await updateGridRow({
	// 										formData,
	// 										newValue,
	// 										setValue,
	// 										fromIndex: operation.fromRowIndex,
	// 										gridMeta
	// 									})(item, index);
	// 									return updatedRow;
	// 								})
	// 						)
	// 						console.log("updatedRows", updatedRows);

	// 						newGridData.splice(
	// 							operation.fromRowIndex,
	// 							updatedRows.length,
	// 							...updatedRows
	// 						)
	// 					} else {
	// 						console.log("grid.asyncRef.supressEvents is TRUE, grid changes not triggered");
	// 					}
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
	// 				handleRefreshAmt({ setValue, gridData: newGridData });
	// 			}
	// 		},
	// 	[updateGridRow, grid, handleRefreshAmt]
	// );

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult, prevGridData }) => {
		console.log("onGridChanged", gridData);
		if (updateResult.rows > 0 && !updateResult.cols.includes("prod")) {
			handleRefreshAmt({
				gridData,
				// taxExcluded: formData.taxExcluded,
				setValue,
				formData
			});
		}

		if (updateResult.cols.includes("prod") || updateResult.cols.includes("SQty") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const updated = mapTooltip({ updateResult, prevGridData, gridData, rowIndex: updateResult.rowIndex })
			console.log("after reduce", updated);
			return updated;
		}

	}, [handleRefreshAmt, mapTooltip]);

	const onEditorSubmit = useCallback(
		({ setValue, gridMeta }) => (data) => {
			sqtyManager.setCommitted(false);
			console.log("onEditorSubmit", data);
			console.log("prodGrid.gridData", grid.gridData);
			const collected = C08.transformForSubmitting(
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
		[sqtyManager, grid.gridData, handleSave]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebC08Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C08",
				IDs: crud.itemData?.TxoID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebC08Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.TxoID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
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
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			toastEx.error("編輯檢查失敗", err);
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
				toastEx.warn(message);
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

				toastEx.warn(`訂貨單號 ${filteredOutOrdIds.join(", ")} 已同步移除`);
			}
		},
		[]
	);

	const handleDepOrdersChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				if (newValue.length === 0) {
					grid.setGridData([], {
						fillRows: crud.creating
					});
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
						grid.setGridData(data.prods, {
							fillRows: true,
							supressEvents: true
						});
						handleRefreshAmt({ setValue, formData: data, gridData: data.prods });
						// toastEx.info("訂購單商品已載入");
						checkAndRemoveDepOrders({
							gridData: data.prods,
							message: payload.ErrorMsg,
							setValue,
							newOrders: newValue,
						});
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("載入訂購單商品失敗", err);
				}
			},
		[grid, crud.creating, httpPostAsync, token, handleRefreshAmt, checkAndRemoveDepOrders]
	);

	const handleTxiDeptChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				const formData = getValues();
				// 若有 depOrders 則完全清空
				if (formData.depOrders?.length > 0 || newValue == null) {
					console.log("handleTxiDeptChanged", newValue);
					setValue("depOrders", []);
					grid.setGridData([], {
						fillRows: true
					});
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
							grid.setGridData(data.prods, {
								fillRows: true
							});
							handleRefreshAmt({ setValue, gridData: data.prods });
							// toastEx.info("商品單價已更新");
						} else {
							throw error ?? new Error("未預期例外");
						}
					} catch (err) {
						toastEx.error("商品單價更新失敗", err);
					}
				}
			},
		[httpPostAsync, grid, handleRefreshAmt, token]
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
	// 				toastEx.error("讀取訂單資訊失敗", err));
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
		// buildGridChangeHandler,
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
		// loadStockPword,
		// 門市訂單資訊
		// depOrderInfo,
		// loadDepOrderInfoWorking: loadDepOrderInfoAction.working,
		// getSOrdId,
		handleGridCellFocusChange,
		// getRowClassName,
		// getTooltip,
		...sideDrawer,
		committed,
		onUpdateRow,
		onGridChanged,
		isRowDeletable,
		handlePrint
	};
};
