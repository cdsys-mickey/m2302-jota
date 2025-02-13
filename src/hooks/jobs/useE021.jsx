import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toast-ex";
import E021 from "@/modules/md-e021";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/sd-forms";
import Objects from "@/shared-modules/sd-objects";
import { isDate } from "lodash";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";
import { useAppModule } from "./useAppModule";
import ConfigContext from "@/contexts/config/ConfigContext";

export const useE021 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "E021",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedOrd, setSelectedOrd] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/sales/customer-invoices",
		bearer: token,
		initialFetchSize: 50,
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

	const createRow = useCallback(
		() => E021.createRow(),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		createRow
	});

	const sqtyManager = useSQtyManager({
		grid,
		convType: "s"
	});
	const { committed } = sqtyManager;

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
		return rowData?.SNotQty && Number(rowData?.SNotQty) <= 0;
	}, []);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			SalDate: new Date(),
			ArrDate: new Date(),
			taxExcluded: false,
			customerOrders: [],
			retail: false,
			RecdAmt: 0,
			prods: [],
		};
		crud.promptCreating({ data });
		sqtyManager.reset();
		grid.initGridData(data.prods, {
			fillRows: 13
		});
	}, [crud, grid, sqtyManager]);

	const updateAmt = useCallback(({ setValue, formData, reset = false }) => {
		if (reset) {
			setValue("SalAmt", "");
			setValue("TaxAmt", "");
			setValue("TotAmt", "");
			setValue("RecdAmt", "");
			setValue("ArecAmt", "");
		} else {
			setValue("SalAmt", formData.SalAmt);
			setValue("TaxAmt", formData.TaxAmt);
			setValue("TotAmt", formData.TotAmt);
			setValue("RecdAmt", formData.RecdAmt);
			setValue("ArecAmt", formData.ArecAmt);
		}
	}, []);

	const handleRefreshAmt = useCallback(
		async ({ formData, gridData, setValue }) => {
			const total = E021.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-invoices/refresh-amt",
					bearer: token,
					data: {
						taxExcluded: formData.taxExcluded ? 1 : 0,
						salesAmt: total,
						receivedAmt: formData.RecdAmt
					},
				});
				if (status.success) {
					console.log("refresh-amt", payload);
					setValue("SalAmt", total.toString());
					setValue("TaxAmt", payload.TaxAmt);
					setValue("TotAmt", payload.TotAmt);
					setValue("ArecAmt", payload.ArecAmt);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toastEx.error("計算合計失敗", err);
			}
		},
		[httpGetAsync, token]
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
					url: "v1/sales/customer-invoices",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = E021.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					sqtyManager.recoverStockMap(data.prods, {
						// stock: {
						// 	simulate: true
						// }
					});
					setSelectedOrd(data);

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
					["tooltip"]: E021.getTooltip({
						rowData: processedRowData,
						rowIndex
					}),
				}

				return processedRowData;
			}
			return row; // 不符合條件則返回原本的列
		});
	}, [sqtyManager]);

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
					url: "v1/sales/customer-invoices",
					data: data,
					bearer: token,
				}) : await httpPutAsync({
					url: "v1/sales/customer-invoices",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(creating ? `新增成功` : "修改成功");
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
				if (err.code === 102 && err.data.Row) {
					const rowIndex = Number(err.data.Row) - 1;
					const rowData = grid.gridData[rowIndex];
					const stock = Number(err.data.StockQty);

					sqtyManager.handleOverrideSQty({
						setValue, gridMeta, formData: data, rowData, rowIndex, stock, submitAfterCommitted: true, onCommit: ({ gridData }) => {
							handleRefreshAmt({
								gridData,
								// taxExcluded: data.taxExcluded,
								setValue,
								formData: data
							})

							const updated = mapTooltip({ gridData, rowIndex })
							grid.setGridData(updated);
						}
					});
				} else {
					toastEx.error(creating ? `新增失敗` : `修改失敗`, err);
				}
			}
		},
		[crud, httpPostAsync, token, httpPutAsync, listLoader, loadItem, grid, sqtyManager, handleRefreshAmt, mapTooltip]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			crud.cancelAction();

			loadItem({ id: rowData.銷貨單號 });
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
	// const handleUpdate = useCallback(
	// 	async ({ data, setValue, gridMeta }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/sales/customer-invoices",
	// 				data,
	// 				bearer: token,
	// 			});
	// 			if (status.success) {
	// 				toastEx.success(`修改成功`);
	// 				crud.doneUpdating();
	// 				loadItem({ refresh: true });
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failUpdating();
	// 			console.error("handleCreate.failed", err);
	// 			if (err.code === 102 && err.data) {
	// 				const rowIndex = Number(err.data.Row) - 1;
	// 				const 


	// 					dialogs.confirm({
	// 						message: `第 ${err.data.Row} 筆庫存(${err.data.StockQty})不足, 是否強迫銷貨?`,
	// 						onConfirm: () => {
	// 							sqtyManager.handleOverrideSQty({ setValue, gridMeta });
	// 						}
	// 					})
	// 			} else {
	// 				toastEx.error("修改失敗", err), {
	// 					position: "top-right"
	// 				});
	// 			}
	// 		}
	// 	},
	// 	[crud, dialogs, httpPutAsync, listLoader, loadItem, sqtyManager, token]
	// );

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除銷貨單「${itemData?.SalID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/customer-invoices`,
						bearer: token,
						params: {
							id: itemData?.SalID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toastEx.success(`成功删除銷貨單 ${itemData?.SalID}`);
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

			if (!isDate(formData.SalDate)) {
				toastEx.error("請先輸入銷貨日", {
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
					url: "v1/sales/customer-invoices/prod-info",
					bearer: token,
					params: {
						id: prodId,
						retail: formData.retail ? 1 : 0,
						cst: formData.customer?.CustID || "",
						sdate: Forms.formatDate(formData.SalDate),
					},
				});

				if (status.success) {
					sqtyManager.updateStockQty(prodId, payload.StockQty);
					return {
						...payload,
					};
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢報價失敗", err);
			}
		},
		[httpGetAsync, sqtyManager, token]
	);



	const handleTaxTypeChange = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("onTaxTypeChanged", newValue);
				const formData = getValues();
				console.log("formData", formData);
				handleRefreshAmt({
					formData: {
						...formData,
						taxExcluded: newValue
					},
					gridData: grid.gridData,
					setValue,
				});
			},
		[handleRefreshAmt, grid.gridData]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData, formData }) => {
			let processedRowData = { ...rowData };

			// const customer = formData.customer;
			const prodId = rowData?.prod?.ProdID;
			const prodInfo = prodId
				? await getProdInfo(prodId, {
					formData
				}) : null;

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
				["SQtyNote"]: "",
				["StockQty"]: "",
				// ["OrdQty_N"]: "",
				// ["LaveQty_N"]: "",
				["tooltip"]: ""
			};
			return processedRowData;
		},
		[getProdInfo, sqtyManager]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
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
			updateResult.cols.push("prod")
			console.log(
				`prod[${rowIndex + 1}] changed`,
				rowData?.prod
			);
			processedRowData = await handleGridProdChange({
				rowData,
				oldRowData,
				formData,
				newValue
			});

		}

		// 數量改變
		if (processedRowData.SQty !== oldRowData.SQty) {
			updateResult.cols.push("SQty")
			processedRowData = sqtyManager.handleGridSQtyChange({
				rowData: processedRowData,
				gridData: newValue,
				rowIndex,
				setValue,
				gridMeta,
				// 透過對話框等操作直接更新 SQty 不會觸發 GridChange, 所以必須帶上 refreshAmt 處理函式
				onCommit: ({ gridData }) => {
					handleRefreshAmt({
						formData,
						gridData,
						setValue,
					});

					const updated = mapTooltip({ gridData, rowIndex })
					grid.setGridData(updated);
				}
			});

			// 新增時, 數量會同步到未進量
			processedRowData = {
				...processedRowData,
				["SNotQty"]: rowData.SQty,
			};
			updateResult.cols.push("SNotQty")
		}

		// 試贈樣、單價或數量改變
		if (
			processedRowData.stype?.id !== oldRowData.stype?.id ||
			processedRowData.SPrice !== oldRowData.SPrice ||
			processedRowData.SQty !== oldRowData.SQty
		) {
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
			dirty = true;
			updateResult.cols.push("SAmt")
		}

		// 未進量改變
		if (processedRowData.SNotQty !== oldRowData.SNotQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]:
					processedRowData.SNotQty === 0 ? 0 : processedRowData.SQty - processedRowData.SOutQty,
			};
			updateResult.cols.push("SNotQty")
		}
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [grid, handleGridProdChange, handleRefreshAmt, sqtyManager, mapTooltip]);



	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult, prevGridData }) => {
		console.log("onGridChanged", gridData);
		handleRefreshAmt({
			gridData,
			// taxExcluded: formData.taxExcluded,
			setValue,
			formData
		});

		// 變更「商品」、「數量」或是「刪除」
		if (updateResult.cols.includes("prod") || updateResult.cols.includes("SQty") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const updated = mapTooltip({ updateResult, prevGridData, gridData, rowIndex: updateResult.rowIndex })
			console.log("after reduce", updated);
			return updated;
		}
	}, [handleRefreshAmt, mapTooltip]);

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
		({ setValue, gridMeta }) => (data) => {
			sqtyManager.setCommitted(false);
			console.log("onEditorSubmit", data);
			const collected = E021.transformForSubmitting(
				data,
				grid.gridData
			);
			console.log("collected", collected);
			handleSave({ data: collected, setValue, gridMeta });
			// if (crud.creating) {
			// 	handleCreate({ data: collected, setValue, gridMeta });
			// } else if (crud.updating) {
			// 	handleUpdate({ data: collected, setValue, gridMeta });
			// } else {
			// 	console.error("UNKNOWN SUBMIT TYPE");
			// }
		},
		[grid.gridData, handleSave, sqtyManager]
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
					url: "v1/prod/data-grid/E021",
					bearer: token,
					params: {
						...E021.transformProdCriteriaAsQueryParams(criteria),
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
					throw error || new Error("未預期例外");
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
					url: "v1/prod/data-grid/E021",
					bearer: token,
					params: {
						...E021.transformProdCriteriaAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].E021031_W1 || [];
					console.log("data", data);
					const formData = form.getValues();
					grid.initGridData(E021.transformForGridImport(data, formData?.employee, formData?.Date), {
						fillRows: true,
					});
					toastEx.success(`成功帶入 ${data.length} 筆商品`);
					importProdsAction.clear();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				importProdsAction.fail({ error: err });
				toastEx.error("帶入商品發生錯誤", err);
			}
		},
		[httpGetAsync, importProdsAction, ipState.criteria, ipState.saveKey, grid, token]
	);

	const onImportProdsSubmitError = useCallback((err) => {
		console.error("onImportProdsSubmitError", err);
	}, []);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "E021",
				IDs: crud.itemData?.SalID,
			};
			postToBlank(
				`${config.REPORT_URL}/WebE02Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[config.REPORT_URL, crud.itemData?.SalID, operator?.CurDeptID, operator?.LogKey, postToBlank]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
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
		setValue("remark", "");
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
					const collected = E021.transformForSubmitting(
						data,
						grid.gridData
					);
					console.log("collected", collected);

					const { status, payload, error } = await httpPostAsync({
						url: "v1/sales/customer-invoices/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = E021.transformForReading(payload.data[0]);
						console.log("data.prods", data.prods);
						// 置換 grid 部分
						grid.initGridData(data.prods, {
							fillRows: true
						})
						// toastEx.info("商品單價已更新");
						// 置換採購金額
						setValue("SalAmt", data.SalAmt);
						setValue("TaxAmt", data.TaxAmt);
						setValue("TotAmt", data.TotAmt);
						setValue("RecdAmt", data.RecdAmt);
						setValue("ArecAmt", data.ArecAmt);
						setPrevData({
							customer: data?.customer,
						});
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					console.error("onRefreshGridSubmit failed", err);
					toastEx.error("單價重整失敗", err);
					// 還原
					const prevData = getPrevData();
					setValue("customer", prevData?.customer);
				}
			},
		[grid, httpPostAsync, token, setPrevData, getPrevData]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta, gridMeta, handleSubmit }) => async (newValue) => {
		console.log("handleCustomerChange", newValue);
		formMeta.asyncRef.current.supressEvents = true;
		setValue("CustName", newValue?.CustData || "");
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
					throw error || new Error("未預期例外");
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


		setValue("transType", E021.getTransType(customerInfo), {
			shouldTouch: true
		});
		setValue("taxExcluded", E021.getTaxExcluded(customerInfo), {
			shouldTouch: true
		});
		setValue("paymentType", E021.getPaymentType(customerInfo), {
			shouldTouch: true
		});
		setValue("employee", E021.getEmployee(customerInfo), {
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


	const getTooltip = useCallback(({ rowData }) => {
		if (!rowData.SOrdID) {
			return "";
		}

		let results = [];

		if (rowData?.SOrdID != null) {
			results.push(`訂貨單號: ${rowData?.SOrdID || "(空白)"}`);
		}

		return results.join(", ");
	}, []);

	const handleCustomerOrdersChanged = useCallback(
		({ setValue, getValues, reset }) =>
			async (newValue) => {
				console.log("handleCustomerOrdersChanged", newValue);
				const formData = getValues();

				if (newValue.length === 0) {
					setValue("dontPrtAmt", false);
					grid.setGridData(
						grid.fillRows({ data: [] }), {
						supressEvents: true
					});
					return;
				}
				try {
					const { status, payload, error } = await httpGetAsync({
						url: "v1/sales/customer-invoices/load-prods",
						bearer: token,
						params: {
							cst: formData.customer?.CustID,
							ids: newValue.map(x => x["訂貨單號"]).join(",")
						},
					});
					console.log("load-prods.payload", payload);
					if (status.success) {
						const data = E021.transformForReading(payload.data[0]);
						console.log("refreshed data", data);
						const { prods, ...formData } = data;
						// 更新 grid
						grid.setGridData(
							grid.fillRows({ data: prods }), {
							supressEvents: true
						});

						reset(formData);
						// setValue("CustName", data?.CustName || "");
						// setValue("CompTel", data?.CompTel || "");
						// setValue("RecAddr", data?.RecAddr || "");
						// setValue("InvAddr", data?.InvAddr || "");
						// setValue("UniForm", data?.UniForm || "");
						// setValue("transType", data?.transType || "");
						// setValue("employee", data?.employee || "");
						// setValue("taxExcluded", data?.taxExcluded || "");
						// setValue("paymentType", data?.paymentType || "");
						// // 更新備註
						// setValue("remark", data?.remark || "");

						// // 更新列印註記
						// setValue("dontPrtAmt", data.dontPrtAmt);
						// // 更新數字
						// updateAmt({ setValue, formData: data });
						// // toastEx.info("採購單商品已載入");

					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("載入訂購單商品失敗", err);
				}
			},
		[grid, httpGetAsync, updateAmt, token]
	);

	const handleRecdAmtChange = useCallback(({ setValue, getValues }) => (newValue) => {
		console.log("handleRecdAmtChange", newValue);
		const formData = getValues();
		console.log("formData", formData);
		handleRefreshAmt({
			gridData: grid.gridData,
			setValue,
			formData
		});
	}, [grid.gridData, handleRefreshAmt]);

	const checkEditableAction = useAction();
	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/sales/customer-invoices/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.SalID,
				},
			});
			if (status.success) {
				crud.promptUpdating();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toastEx.error("編輯檢查失敗", err);
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

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
		onGridChanged,
		handleTaxTypeChange,
		handleRecdAmtChange,
		getTooltip,
		handleCustomerOrdersChanged,
		committed,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// Grid 重整
		onRefreshGridSubmit,
		onRefreshGridSubmitError
	};
};
