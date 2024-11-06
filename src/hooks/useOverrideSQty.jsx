import { AuthContext } from "@/contexts/auth/AuthContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { useState } from "react";

const useOverrideSQty = ({ grid, action = "強迫銷貨", stypeColumn = "stype", priceColumn = "SPrice", samtColumn = "SAmt", sqtyColumn = "SQty", sqtyNoteColumn = "SQtyNote", stockQtyColumn = "StockQty_N", markColumn = "sqtyError", prodIdKey = "prod.ProdID", prodNameKey = "prod.ProdData" }) => {
	const { token } = useContext(AuthContext);
	const stockQtyMap = useMemo(() => new Map(), []);
	const [committed, setCommitted] = useState(false);
	const pwordLockRef = useRef(null);
	const sqtyLockRef = useRef(null);

	const dialogs = useContext(DialogsContext);
	const {
		httpGetAsync,
	} = useWebApi();

	const getStockQty = useCallback((prodId) => {
		return stockQtyMap.get(prodId) || 0;
	}, [stockQtyMap]);

	const setStockQty = useCallback((prodId, value) => {
		stockQtyMap.set(prodId, Number(value));
	}, [stockQtyMap]);

	// 讀取密碼
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
			toast.error(Errors.getMessage("讀取設定發生錯誤", err), {
				position: "top-center"
			});
		}
	}, [httpGetAsync, token]);

	const commitSQty = useCallback(
		({ }) => {
			const sqtyLock = sqtyLockRef.current;
			const { refreshAmt, gridMeta, rowData } = sqtyLock;
			// 置換

			const newRowData = {
				...rowData,
				[sqtyColumn]: sqtyLock.demand,
				[samtColumn]:
					!sqtyLock.price || !sqtyLock.demand
						? ""
						: sqtyLock.stype?.id
							? 0
							: sqtyLock.price * sqtyLock.demand,
				[sqtyNoteColumn]: "*",
			};
			console.log("commitSQty", newRowData);

			grid.setValueByRowIndex(sqtyLock.rowIndex, newRowData);
			let newGridData = [...grid.gridData];
			newGridData[sqtyLock.rowIndex] = newRowData;

			// 寫總計
			// const total = C08.getTotal(newGridData);
			// setValue("TxoAmt", total.toFixed(2));
			if (refreshAmt) {
				refreshAmt({ gridData: newGridData });
			} else {
				console.warn("未提供 refreshAmt 函式");
			}

			gridMeta.setActiveCell({
				col: sqtyColumn,
				row: sqtyLock.rowIndex,
			});
			if (sqtyLock.submitAfterCommitted) {
				setCommitted(true);
			}

			sqtyLockRef.current = null;
		},
		[grid, samtColumn, sqtyColumn, sqtyNoteColumn]
	);

	/**
	 * 確認強迫
	 */
	const promptOverrideSQty = useCallback(
		() => {
			const sqtyLock = sqtyLockRef.current;
			const { gridMeta } = sqtyLock;
			dialogs.confirm({
				message: `[${sqtyLock.prodId} ${sqtyLock.prodName}] 庫存不足( ${sqtyLock.stock} < ${sqtyLock.demand} )，是否${action}？`,
				onConfirm: () => {
					commitSQty({});
				},
				onCancel: () => {
					console.log("sqty cancelled");
					gridMeta.setActiveCell({
						col: sqtyColumn,
						row: sqtyLock.rowIndex,
					});
				},
			});
		},
		[action, commitSQty, dialogs, sqtyColumn]
	);



	const promptPwordEntry = useCallback(
		(opts = {}) => {
			const { first = false } = opts;
			console.log("promptPwordEntry, first:", first);
			const sqtyLock = sqtyLockRef.current;
			const pwordLock = pwordLockRef.current;

			const { gridMeta } = sqtyLock;

			dialogs.prompt({
				title: "貨品庫存不足",
				message: `[${sqtyLock.prodId} ${sqtyLock.prodName}] 庫存不足${sqtyLock.stock != null ? `(${sqtyLock.demand} > ${sqtyLock.stock})` : ""}，若要${action}請輸入密碼`,
				label: `${action}密碼`,
				triggerCancelOnClose: true,
				onConfirm: ({ value }) => {
					if (value === pwordLock.value) {
						console.log("pword passed");
						pwordLockRef.current = {
							...pwordLockRef.current,
							passed: true,
						};
						promptOverrideSQty();
					} else {
						// dialogs.closeLatest();
						console.log("pword not passed");
						toast.error("密碼錯誤, 請重新輸入", {
							position: "top-center"
						});
						promptPwordEntry();
					}
				},
				onCancel: () => {
					console.log("pword cancelled");
					if (sqtyLock.rowIndex != null) {
						gridMeta.setActiveCell({
							col: "SQty",
							row: sqtyLock.rowIndex,
						});
					}
				},
				// confirmText: "通過",
			});
		},
		[action, dialogs, promptOverrideSQty]
	);

	// 儲存時偵測到庫存不足, 提示 override 的進入點
	const handleOverrideSQty = useCallback(
		({ setValue, gridMeta, formData, rowData, rowIndex, demand, stock, refreshAmt, submitAfterCommitted = false }) => {
			if (!pwordLockRef.current) {
				toast.error("密碼設定為空，請檢查程式");
				return;
			}

			if (!rowData) {
				throw new Error("未指派 rowData 參數");
			}

			const prodId = _.get(rowData, prodIdKey);
			const prodName = _.get(rowData, prodNameKey);

			// 若有傳入 demand 則使用 demand, 否則從 rowData 讀取
			sqtyLockRef.current = {
				...sqtyLockRef.current,
				prodId,
				prodName,
				demand: demand || rowData[sqtyColumn],
				price: rowData[priceColumn],
				stype: rowData[stypeColumn],
				stock,
				rowIndex,
				submitAfterCommitted,
				// 傳遞用
				rowData,
				refreshAmt,
				gridMeta,
				setValue,
				formData
			}

			// 1.如果通過密碼判定(stockPwordPassedRef.current), 則直接跳確認
			gridMeta.setActiveCell(null);
			// 尚未通過或是尚未讀取密碼
			if (!pwordLockRef.current.passed) {
				promptPwordEntry({ first: true });
				return;
			}
			promptOverrideSQty();
		},
		[priceColumn, prodIdKey, prodNameKey, promptOverrideSQty, promptPwordEntry, sqtyColumn, stypeColumn]
	);

	/**
	 * 計算商品即時庫存, 扣除 grid 內 rowIndex 之前的所有需求資料
	 */
	const getStockBeforeCurrent = useCallback(
		({ prodId, rowIndex, gridData }) => {
			const demandTotal = gridData
				.filter(
					(item, index) =>
						item.prod?.ProdID === prodId && index < rowIndex
				)
				.reduce((sum, item) => sum + parseFloat(item[sqtyColumn]), 0);
			const stock = getStockQty(prodId);
			return stock - demandTotal;
		},
		[getStockQty, sqtyColumn]
	);

	const getStockExcludingCurrent = useCallback(
		({ prodId, rowIndex, gridData }) => {
			const demandTotal = gridData
				.filter(
					(item, index) =>
						item.prod?.ProdID === prodId && index != rowIndex
				)
				.reduce((sum, item) => sum + parseFloat(item[sqtyColumn]), 0);
			const stock = getStockQty(prodId);
			return stock - demandTotal;
		},
		[getStockQty, sqtyColumn]
	);

	/**
	 * 當 grid sqty 欄位發生異動時的處理函式
	 */
	const handleGridSQtyChange = useCallback(
		({ rowData, rowIndex, setValue, gridData, gridMeta, refreshAmt }) => {
			if (!rowData.prod) {
				return rowData;
			}

			let newRowData = { ...rowData };

			const stock = getStockExcludingCurrent({
				rowIndex,
				prodId: rowData.prod.ProdID,
				gridData,
			});

			const demand = rowData[sqtyColumn];

			if (demand > 0 && stock < demand) {
				newRowData = {
					...newRowData,
					[sqtyColumn]: 0,
				};

				handleOverrideSQty({ setValue, gridMeta, rowData, rowIndex, demand, stock, refreshAmt });
			} else {
				newRowData = {
					...newRowData,
					[sqtyNoteColumn]: "",
					sqtyError: false,
				};
			}
			return newRowData;
		},
		[getStockExcludingCurrent, handleOverrideSQty, sqtyColumn, sqtyNoteColumn]
	);

	// loadItem 及 save 拋出 102 時呼叫
	const loadStockMap = useCallback(
		async (
			gridData,
			opts = {}
		) => {
			const { mark = false } = opts;
			const _gridData = gridData || grid.gridData;

			if (!gridData || gridData.length === 0) {
				return;
			}
			const prodIds = [
				...new Set(
					_gridData
						.filter((item) => {
							const key = _.get(item, prodIdKey);
							return key != null && key != "";
						})
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
					stockQtyMap.clear();
					payload.Stock?.map((x) =>
						stockQtyMap.set(x.ProdID, Number(x.Qty))
					);
					// 把目前庫存加回去
					// let newGridData = [..._gridData];
					_gridData.forEach((rowData, rowIndex) => {
						const prodId = rowData.prod.ProdID;
						const sqty = Number(rowData[sqtyColumn]);
						const stock = stockQtyMap.get(prodId);
						stockQtyMap.set(prodId, stock + sqty)
					});
					// grid.setGridData(newGridData);
					// if (mark) {
					// 	let newGridData = [..._gridData];
					// 	_gridData.forEach((rowData, rowIndex) => {
					// 		const prodId = rowData.prod.ProdID;
					// 		const sqty = Number(rowData[sqtyColumn]);
					// 		const calculatedStock = getStockBeforeCurrent({
					// 			rowIndex,
					// 			prodId,
					// 			_gridData,
					// 		});
					// 		newGridData[rowIndex] = {
					// 			...rowData,
					// 			[stockQtyColumn]: (
					// 				stockQtyMap.get(prodId) || 0
					// 			).toFixed(2),
					// 			[markColumn]: sqty > calculatedStock,
					// 		};
					// 	});
					// 	grid.setGridData(newGridData);
					// }
					console.log("qtyMap:", stockQtyMap);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("取得庫存失敗", err), {
					position: "top-center"
				});
			}
			return stockQtyMap;
		},
		[grid, prodIdKey, httpGetAsync, token, stockQtyMap, sqtyColumn]
	);

	const getErrorInfo = useCallback((err) => {
		if (err.code !== 102) {
			console.error("只能處理 code 為 102 的錯誤");
			return;
		}
		const rowIndex = Number(err.data.Row) - 1;
		const rowData = grid.gridData[rowIndex];
		const stock = Number(err.data.StockQty);
		return {
			rowIndex,
			rowData,
			stock,
			submitAfterCommitted: true
		}
	}, [grid.gridData]);

	const updateQty = useCallback((key, value) => {
		stockQtyMap.set(key, value);
	}, [stockQtyMap]);

	const clearQty = useCallback(() => {
		stockQtyMap.clear();
	}, [stockQtyMap]);

	const hasQty = useCallback((prodId) => {
		return stockQtyMap.has(prodId);
	}, [stockQtyMap]);

	useInit(() => {
		loadStockPword();
	}, []);

	return {
		getStockQty,
		setStockQty,
		handleOverrideSQty,
		promptOverrideSQty,
		handleGridSQtyChange,
		loadStockMap,
		committed,
		setCommitted,
		getErrorInfo,
		getStockExcludingCurrent,
		getStockBeforeCurrent,
		updateQty,
		clearQty,
		hasQty
	}

}

export default useOverrideSQty