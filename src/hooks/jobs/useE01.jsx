import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toast-ex";
import E01 from "@/modules/E01.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/sd-objects";
import { isDate } from "lodash";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";
import { useAppModule } from "@/hooks/jobs/useAppModule";
export const useE01 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "E01",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedOrd, setSelectedOrd] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/sales/customer-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => E01.createRow(),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		createRow
	});

	const sqtyManager = useSQtyManager({
		grid,
		disablePwordCheck: true,
		convType: "s"
	});

	/**
	 * 變更前備份
	 */
	const prevDataRef = useRef();
	const getPrevData = useCallback(() => {
		return prevDataRef.current;
	}, []);

	const setPrevData = useCallback(
		(updatingValues) => {
			prevDataRef.current = {
				...prevDataRef.current,
				...updatingValues,
			};
			console.log("prevData", getPrevData());
		},
		[getPrevData]
	);



	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SQflag || !!rowData.stype;
	}, []);

	const sqtyDisabled = useCallback(
		({ rowData }) => {
			return (
				rowData.SOutQty > 0 ||
				(!!itemData?.SalIDs &&
					rowData.SQty !== rowData.SNotQty &&
					rowData.SNotQty) > 0
			);
		},
		[itemData?.SalIDs]
	);

	const sNotQtyDisabled = useCallback(({ rowData }) => {
		// return rowData?.SNotQty && Number(rowData?.SNotQty) <= 0;
		// return !rowData?.SalIDs ||
		// 	(rowData?.SOutQty && Number(rowData?.SOutQty) >= Number(rowData?.SQty));
		return (rowData?.SOutQty && Number(rowData?.SOutQty) >= Number(rowData?.SQty));
	}, []);

	const stypeDisabled = useCallback(({ rowData }) => {
		return itemData?.SalIDs ||
			(rowData?.SOutQty && Number(rowData?.SOutQty) > 0)
	}, [itemData?.SalIDs]);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			OrdDate: new Date(),
			ArrDate: new Date(),
			taxExcluded: false,
			retail: false,
			prods: [],
		};
		crud.promptCreating({ data });
		sqtyManager.reset();
		grid.initGridData(data.prods, {
			fillRows: 13
		});
	}, [crud, grid, sqtyManager]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/sales/customer-orders",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`新增成功`);
					crud.doneCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failCreating();
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
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
					itemIdRef.current = itemId;
					crud.startReading("讀取中...", { itemId });
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = E01.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					sqtyManager.recoverStockMap(data.prods, {
						stock: {
							simulate: false
						},
						prepared: {
							excludeSelfOrder: true
						}
					});
					setSelectedOrd(data);
					// const newGridData = data.prods.map(async (rowData, rowIndex) => {

					// })
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

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			crud.cancelAction();

			loadItem({ id: rowData.訂貨單號 });
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
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

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
					url: "v1/sales/customer-orders",
					data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`修改成功`);
					crud.doneUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating();
				console.error("handleCreate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	// const handlePatch = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPatchAsync({
	// 				url: "v1/sales/customer-orders",
	// 				data,
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
	// 			toastEx.error("修改失敗", err), {
	// 				position: "top-right"
	// 			});
	// 		}
	// 	},
	// 	[crud, httpPatchAsync, listLoader, loadItem, token]
	// );

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除訂貨單「${itemData?.OrdID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/customer-orders`,
						bearer: token,
						params: {
							id: itemData?.OrdID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除訂貨單 ${itemData?.OrdID}`);
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

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getProdInfo = useCallback(
		async (prodId, { formData }) => {
			if (!prodId) {
				toastEx.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}

			if (!isDate(formData.OrdDate)) {
				toastEx.error("請先輸入訂貨日", {
					position: "top-right"
				});
				return;
			}

			// if (!formData.customer) {
			// 	toastEx.error("請先輸入客戶代碼", {
			// 		position: "top-right"
			// 	});
			// 	return;
			// }

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-orders/prod-info",
					bearer: token,
					params: {
						id: prodId,
						retail: formData.retail ? 1 : 0,
						cst: formData.customer?.CustID || "",
						ordDate: Forms.formatDate(formData.OrdDate),
					},
				});

				if (status.success) {
					sqtyManager.updateStockQty(prodId, payload.StockQty)
					return {
						...payload,
						...(payload.Price && {
							["SQflag"]: payload.QFlag
						})
					};
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢報價失敗", err);
			}
		},
		[httpGetAsync, sqtyManager, token]
	);

	const fetchAmt = useCallback(
		async ({ taxExcluded, gridData, setValue }) => {
			const total = E01.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-orders/refresh-amt",
					bearer: token,
					data: {
						taxExcluded: taxExcluded ? 1 : 0,
						ordAmt: total,
					},
				});
				if (status.success) {
					console.log("refresh-amt", payload);
					setValue("OrdAmt", total.toString());
					setValue("TaxAmt", payload.TaxAmt);
					setValue("TotAmt", payload.TotAmt);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toastEx.error("計算合計失敗", err);
			}
		},
		[httpGetAsync, token]
	);

	const handleTaxTypeChange = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("onTaxTypeChanged", newValue);
				// console.log("formData", formData);
				fetchAmt({
					gridData: grid.gridData,
					taxExcluded: newValue,
					setValue
				});
			},
		[fetchAmt, grid.gridData]
	);

	const onActiveCellChange = useCallback(({ setValue }) => (cell) => {
		console.log("onActiveCellChange", cell);
		// setValue("activeCell", cell ? {
		// 	row: cell.row,
		// 	col: cell.col
		// } : null);
	}, []);

	const handleGridProdChange = useCallback(
		async ({ rowData, rowIndex, formData, newValue, updateResult }) => {
			let processedRowData = { ...rowData };

			// const customer = formData.customer;


			const prodId = rowData?.prod?.ProdID;
			const prodInfo = prodId
				? await getProdInfo(prodId, {
					formData
				})
				: null;

			if (prodId) {
				sqtyManager.updateStockQty(prodId, Number(prodInfo?.StockQty));
				sqtyManager.updatePreparedQty(prodId, Number(prodInfo?.NotQty));
			}

			processedRowData = {
				...processedRowData,
				["prod"]: prodInfo ? processedRowData.prod : null,
				["ProdData_N"]: prodInfo ? processedRowData.prod?.ProdData || "" : "",
				["PackData_N"]: processedRowData?.prod?.PackData_N || "",
				["SQflag"]: prodInfo?.QFlag || "",
				["SPrice"]: prodInfo?.Price || "",
				["SQty"]: "",
				["SAmt"]: "",
				["stype"]: null,
				["SRemark"]: "",
				["SNotQty"]: "",
				["SOutQty"]: "",
				["StockQty"]: "",
				["OrdQty_N"]: "",
				["LaveQty_N"]: "",
				["tooltip"]: ""
			};

			return processedRowData;
		},
		[getProdInfo, sqtyManager]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);

		let processedRowData = {
			...rowData,
		};

		let dirty = false;
		// 商品
		if (
			processedRowData.prod?.ProdID !==
			oldRowData?.prod?.ProdID
		) {
			console.log(
				`prod[${rowIndex + 1}] changed`,
				rowData?.prod
			);
			processedRowData = await handleGridProdChange({
				rowData: processedRowData,
				rowIndex,
				oldRowData,
				formData,
				newValue
			});

			updateResult.cols.push("prod")
		}

		// 數量改變
		if (processedRowData.SQty !== oldRowData.SQty) {
			updateResult.cols.push("SQty")
			// 會同步到未進量
			processedRowData = {
				...processedRowData,
				["SNotQty"]: rowData.SQty,
			};
			updateResult.cols.push("SNotQty")

		}

		// 單價
		if (
			processedRowData.stype?.id !== oldRowData.stype?.id ||
			processedRowData.SPrice !== oldRowData.SPrice ||
			processedRowData.SQty !== oldRowData.SQty
		) {
			dirty = true;
			// 計算合計
			processedRowData = {
				...processedRowData,
				["SAmt"]:
					!processedRowData.SPrice || !processedRowData.SQty
						? ""
						: processedRowData.stype?.id
							? 0
							: processedRowData.SPrice * processedRowData.SQty,
			};
			updateResult.cols.push("SAmt")
		}

		// 未出量改變
		if (rowData.SNotQty !== oldRowData.SNotQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]:
					rowData.SNotQty === 0 ? 0 : rowData.SQty - rowData.SOutQty,
			};
			updateResult.cols.push("SNotQty")
		}
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	const sprodDisabled = useCallback(({ rowData }) => {
		return !!(itemData?.SalIDs);
	}, [itemData?.SalIDs]);

	const isRowDeletable = useCallback(({ key, rowData }) => {
		return !(itemData?.SalIDs);
	}, [itemData?.SalIDs]);

	const mapTooltip = useCallback(({ updateResult, prevGridData, gridData, rowIndex }) => {
		console.log(`mapTooltip(rowIndex: ${rowIndex})`);
		let _prodId;
		if (updateResult?.type === "DELETE") {
			_prodId = prevGridData[rowIndex]?.prod?.ProdID || '';
		} else {
			const targetRow = gridData[rowIndex];
			_prodId = targetRow.prod?.ProdID;
			// 如果 targetProdID 為空，則使用 prevGridData 的 ProdID
			if (!_prodId) {
				_prodId = prevGridData[rowIndex]?.prod?.ProdID || '';
			}
		}

		// 若 targetProdID 仍為空，則不執行更新
		if (!_prodId) {
			return gridData;
		}

		// 計算其他符合條件列的 SQty 加總
		return gridData.map((row, index) => {
			if (row.prod?.ProdID === _prodId) {
				if ((row.SNotQty && row.SNotQty <= 0) || (row.SOutQty && row.SOutQty != 0)) {
					return {
						...row,
						StockQty_N: "",
						OrdQty_N: "",
						LaveQty_N: "",
						tooltip: ""
					};
				}

				// 加總其他與 index 不同的 SQty
				// let otherRowTotalSQty = gridData.reduce((acc, innerRow, innerIndex) => {
				// 	if (innerIndex !== index && innerRow.prod?.ProdID === _prodId) {
				// 		return acc + Number(innerRow.SQty || 0);
				// 	}
				// 	return acc;
				// }, 0);
				let sameProdRowTotalSQty = gridData.reduce((acc, currentRow) => {
					if (currentRow.prod?.ProdID === _prodId) {
						return acc + Number(currentRow.SQty || 0);
					}
					return acc;
				}, 0);

				const stock = sqtyManager.getStockQty(_prodId);
				// const stock = sqtyManager.getRemainingStock({ prodId: _prodId, gridData });

				const otherOrderSQty = sqtyManager.getPreparedQty(_prodId);
				// const ordQty = otherOrderSQty + otherRowTotalSQty;
				const ordQty = otherOrderSQty + sameProdRowTotalSQty;
				const remaining = stock - ordQty;

				let processedRowData = {
					...row,
					StockQty_N: stock,
					OrdQty_N: ordQty,
					LaveQty_N: remaining
				};

				processedRowData = {
					...processedRowData,
					["tooltip"]: E01.getTooltip({
						rowData: processedRowData,
						rowIndex
					}),
				}

				return processedRowData;
			}
			return row; // 不符合條件則返回原本的列
		});
	}, [sqtyManager]);

	const onGridChanged = useCallback(async ({ gridData, formData, setValue, updateResult, prevGridData }) => {
		console.log(`useE01.onGridChanged`, updateResult);
		if (updateResult.rows > 0 && !updateResult.cols.includes("prod")) {
			await fetchAmt({
				gridData,
				taxExcluded: formData.taxExcluded,
				setValue
			});
		}

		if (updateResult.cols.includes("prod") || updateResult.cols.includes("SQty") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const updated = mapTooltip({ updateResult, prevGridData, gridData, rowIndex: updateResult.rowIndex })
			console.log("after reduce", updated);
			return updated;
		}
	}, [fetchAmt, mapTooltip]);

	// const buildGridChangeHandlerOld = useCallback(
	// 	({ gridMeta, getValues }) => async (newValue, operations) => {
	// 		console.log("prevGridData", grid.prevGridData);
	// 		console.log("gridData", grid.gridData);
	// 		console.log("buildGridChangeHandler", operations);
	// 		const newGridData = [...newValue];
	// 		for (const operation of operations) {
	// 			if (operation.type === "UPDATE") {
	// 				newValue
	// 					.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					.forEach((rowData, i) => {
	// 						const rowIndex = operation.fromRowIndex + i;
	// 						const oldRowData = grid.gridData[rowIndex];

	// 						let processedRowData = { ...rowData };

	// 						if (
	// 							rowData.prod?.ProdID !==
	// 							oldRowData?.prod?.ProdID
	// 						) {
	// 							console.log(
	// 								`[${rowIndex}]prod changed`,
	// 								rowData?.prod
	// 							);
	// 							processedRowData = handleGridProdChange({
	// 								rowData,
	// 								oldRowData,
	// 								getValues
	// 							});
	// 						}

	// 						newGridData[rowIndex] = processedRowData;
	// 					});
	// 			} else if (operation.type === "DELETE") {
	// 				newGridData.splice(operation.fromRowIndex, operation.toRowIndex - operation.fromRowIndex + 1);
	// 			} else if (operation.type === "CREATE") {
	// 				console.log("dsg.CREATE");
	// 				// process CREATE here
	// 				gridMeta.toFirstColumn({ nextRow: true });
	// 			}
	// 		}
	// 		console.log("after changed", newGridData);
	// 		grid.setGridData(newGridData);
	// 	},
	// 	[grid, handleGridProdChange]
	// );

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = E01.transformForSubmitting(
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
		[crud.creating, crud.updating, grid, handleCreate, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// console.log(`getRowKey, rowIndex: ${rowIndex}, rowData:`, rowData);
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	// 帶入商品
	const importProdsAction = useAction();

	const [ipState, setIpState] = useState({
		criteria: null,
		saveKey: null,
		totalElements: null,
		loading: false,
	});

	const peekProds = useCallback(
		async (criteria) => {
			if (!token) {
				throw new Error("token not specified");
			}
			if (Objects.isAllPropsEmpty(criteria)) {
				console.log("criteria is empty");
				if (ipState.saveKey) {
					setIpState((prev) => ({
						...prev,

						saveKey: null,
						totalElements: null,
					}));
				}
				return;
			}
			setIpState((prev) => ({
				...prev,
				loading: true,
				criteria: criteria,
			}));

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/prod/data-grid/E01",
					bearer: token,
					params: {
						...E01.transformProdCriteriaAsQueryParams(criteria),
						pk: 1,
					},
				});
				if (status.success) {
					setIpState((prev) => ({
						...prev,
						saveKey: payload.Select?.SaveKey,
						totalElements: payload.Select?.TotalRecord,
					}));
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				console.error("peek failed", err);
				toastEx.error("篩選失敗", err);
			} finally {
				setIpState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[httpGetAsync, ipState.saveKey, token]
	);

	const onImportProdsSubmit = useCallback(
		({ form }) => async (data) => {
			console.log("onImportProdsSubmit", data);
			try {
				importProdsAction.start();
				const { status, payload, error } = await httpGetAsync({
					url: "v1/prod/data-grid/E01",
					bearer: token,
					params: {
						...E01.transformProdCriteriaAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].E01031_W1 || [];
					console.log("data", data);
					const formData = form.getValues();
					grid.initGridData(E01.transformForGridImport(data, formData?.employee, formData?.Date), {
						createRow,
					});
					toastEx.success(`成功帶入 ${data.length} 筆商品`);
					importProdsAction.clear();
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				importProdsAction.fail({ error: err });
				toastEx.error("帶入商品發生錯誤", err);
			}
		},
		[
			createRow,
			httpGetAsync,
			importProdsAction,
			ipState.criteria,
			ipState.saveKey,
			grid,
			token,
		]
	);

	const onImportProdsSubmitError = useCallback((err) => {
		console.error("onImportProdsSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebE01Rep.aspx`
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
				JobName: "E01",
				IDs: crud.itemData?.OrdID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebE01Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.OrdID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
	}, []);

	const loadProdFormMeta = useFormMeta(
		`
		sprod,
		eprod,
		typeA,
		catL,
		catM,
		catS
		`
	)

	const squaredDisabled = useMemo(() => {
		return itemData?.CFlag === "*" || crud.creating;
	}, [crud.creating, itemData?.CFlag]);

	/**
	 * 變更零售註記 → 清空所有商品,
	 * 部分加上 shouldTouch 註記, 避免 event propagation
	 */
	const handleRetailChange = useCallback(({ setValue, gridMeta }) => (newValue) => {
		console.log("handleRetailChange", newValue);
		setValue("customer", null);
		setValue("CustName", "");
		setValue("CompTel", "");
		setValue("RecAddr", "");
		setValue("InvAddr", "");
		setValue("UniForm", "");
		setValue("transType", null, {
			shouldTouch: true
		});
		setValue("taxExcluded", null, {
			shouldTouch: true
		});
		setValue("paymentType", null, {
			shouldTouch: true
		});
		setValue("employee", null, {
			shouldTouch: true
		});
		gridMeta.setActiveCell(null);
		grid.initGridData([], {
			fillRows: true
		});
	}, [grid]);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					const collected = E01.transformForSubmitting(
						data,
						grid.gridData
					);
					console.log("collected", collected);

					const { status, payload, error } = await httpPostAsync({
						url: "v1/sales/customer-orders/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = E01.transformForReading(payload.data[0]);
						console.log("data.prods", data.prods);
						// 置換 grid 部分
						grid.initGridData(
							grid.fillRows({
								data: data.prods,
								// length: DEFAULT_ROWS,
								createRow,
							})
						);
						// toastEx.info("商品單價已更新");
						// 置換採購金額
						setValue("TaxAmt", data.TaxAmt);
						setValue("OrdAmt", data.OrdAmt);
						setValue("TotAmt", data.TotAmt);
						setPrevData({
							customer: data?.customer,
						});
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					console.error("onRefreshGridSubmit failed", err);
					toastEx.error("單價重整失敗", err);
					// 還原
					const prevData = getPrevData();
					setValue("customer", prevData?.customer);
				}
			},
		[grid, httpPostAsync, token, createRow, setPrevData, getPrevData]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	/**
	 * 變更客戶編號
	 * - 正式客戶 → 重新抓取報價 + 清除無報價資料
	 * - 零售客戶 → 重新抓取報價
	 */
	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta, gridMeta, handleSubmit }) => async (newValue) => {
		console.log("handleCustomerChange", newValue);
		formMeta.asyncRef.current.supressEvents = true;
		// setValue("CustName", newValue?.CustData ?? "");
		setValue("CustName", newValue?.AbbrName ?? "");
		let customerInfo = null;
		if (newValue) {
			const retail = getValues("retail");
			try {
				const { status, payload, error } = await httpGetAsync({
					url: `v1/sales/customer-orders/customer-info`,
					bearer: token,
					params: {
						cst: newValue.CustID,
						sal: retail ? "Y" : ""
					}
				});
				if (status.success) {
					customerInfo = payload.data[0];
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				console.error(err);
				toastEx.error("讀取客戶資料發生錯誤", err);
			}
		}

		setValue("CompTel", customerInfo?.CompTel || "");
		setValue("RecAddr", customerInfo?.RecAddr || "");
		setValue("InvAddr", customerInfo?.InvAddr || "");
		setValue("UniForm", customerInfo?.UniForm || "");


		setValue("transType", E01.getTransType(customerInfo), {
			shouldTouch: true
		});
		setValue("taxExcluded", E01.getTaxExcluded(customerInfo), {
			shouldTouch: true
		});
		setValue("paymentType", E01.getPaymentType(customerInfo), {
			shouldTouch: true
		});
		setValue("employee", E01.getEmployee(customerInfo), {
			shouldTouch: true
		});

		if (grid.gridData.filter(rowData => rowData.prod?.ProdID).length > 0) {
			handleSubmit();
		} else {
			console.log("grid is empty, refresh-grid not triggered")
		}


		gridMeta.setActiveCell(null);
		formMeta.asyncRef.current.supressEvents = false;
	}, [grid.gridData, httpGetAsync, token]);

	const checkEditableAction = useAction();
	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/sales/customer-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.OrdID,
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

	// const getTooltip = useCallback(({ rowData, rowIndex }) => {
	// 	console.log(`getTooltip(${rowIndex})`, rowData);
	// 	let results = [];
	// 	if (rowData.prod?.ProdID) {
	// 		const stockQty = rowData.stock;
	// 		results.push(`庫存量（${stockQty || 0}）`);

	// 		const demandOfOtherRows = rowData.prepared;
	// 		results.push(`目前訂購量（${demandOfOtherRows || 0}）`);

	// 		const remaining = rowData.remaining;

	// 		results.push(`剩餘量（${remaining || 0}）`);
	// 	}
	// 	const result = results.join(", ");
	// 	console.log(`${getTooltip.name}`, result);
	// 	return result;
	// }, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		selectedOrd,
		loadItem,
		handleSelect,
		onSearchSubmit,
		onSearchSubmitError,
		confirmQuitCreating,
		confirmQuitUpdating,
		confirmReturnReading,
		confirmDelete,
		promptCreating,
		onEditorSubmit,
		onEditorSubmitError,
		// 報價 Grid
		createRow,
		// buildGridChangeHandlerOld,
		...grid,
		grid,
		onUpdateRow,
		getRowKey,
		isRowDeletable,
		sprodDisabled,
		// 帶入商品
		importProdsWorking: importProdsAction.working,
		promptImportProds: importProdsAction.prompt,
		cancelImportProds: importProdsAction.clear,
		importProdsDialogOpen: importProdsAction.active,
		onImportProdsSubmit,
		onImportProdsSubmitError,
		peekProds,
		ipState,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		handlePrint,
		// handleLastField,
		loadProdFormMeta,
		...sideDrawer,
		squaredDisabled,
		handleRetailChange,
		handleCustomerChange,
		getSPriceClassName,
		spriceDisabled,
		sqtyDisabled,
		sNotQtyDisabled,
		stypeDisabled,
		onGridChanged,
		handleTaxTypeChange,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// getTooltip,
		onActiveCellChange,
		// activeCell
		// Grid 重整
		onRefreshGridSubmit,
		onRefreshGridSubmitError
	};
};
