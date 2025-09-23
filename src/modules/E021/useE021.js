import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import E021 from "@/modules/E021/E021.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";
import { isDate } from "lodash";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useInit } from "@/shared-hooks/useInit";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import useJotaReports from "@/hooks/useJotaReports";
import useSQtyManager from "@/hooks/useSQtyManager";

export const useE021 = ({ mode }) => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const purchaseOrderIdRef = useRef();
	const prevOrdersRef = useRef([]);
	const { token, operator } = useContext(AuthContext);

	const moduleId = useMemo(() => {
		switch (mode) {
			case E021.Mode.MANAGER:
				return "E021";
			default:
				return "E02";
		}
	}, [mode]);

	const appModule = useAppModule({
		token,
		moduleId: moduleId,
	});



	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { clearParams } = useContext(AppFrameContext);

	const [selectedOrd, setSelectedOrd] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/sales/invoices",
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

	const stypeDisabled = useCallback(({ rowData }) => {
		return mode != E021.Mode.MANAGER;
	}, [mode]);

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
		console.log("grid cleared in promptCreating");
	}, [crud, grid, sqtyManager]);

	const handlePromptCreating = useCallback((e) => {
		e?.stopPropagation();
		promptCreating();
	}, [promptCreating]);

	// 同步不列印金額註記
	const updatePrtAmt = useCallback(({ setValue, formData }) => {
		setValue("dontPrtAmt", formData?.dontPrtAmt ?? false);
	}, []);

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

	const updateCustomerData = useCallback(({ setValue, formMeta }) => (data) => {
		// formMeta.asyncRef.current.supressEvents = true;
		formMeta.supressEvents();
		setValue("retail", data ? data?.retail : false);
		setValue("customer", data ? data?.customer : null);
		setValue("CustName", data?.CustName || "");
		setValue("CompTel", data?.CompTel || "");
		setValue("RecAddr", data?.RecAddr || "");
		setValue("InvAddr", data?.InvAddr || "");
		setValue("UniForm", data?.UniForm || "");
		setValue("transType", data?.transType || "");
		setValue("employee", data?.employee || "");
		setValue("taxExcluded", data?.taxExcluded || "");
		setValue("paymentType", data?.paymentType || "");
		// // 更新備註
		setValue("remark", data?.remark || "");

		// // 更新列印註記
		// setValue("dontPrtAmt", data?.dontPrtAmt ?? false);
		// // 更新數字


		// formMeta.asyncRef.current.supressEvents = false;
		formMeta.enableEvents();
	}, []);

	const handleRefreshAmt = useCallback(
		async ({ formData, gridData, setValue }) => {
			const total = E021.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/invoices/refresh-amt",
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
					url: "v1/sales/invoices",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = E021.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: data,
					});
					// 暫存上次讀取成功的訂貨單
					prevOrdersRef.current = data.customerOrders;
					sqtyManager.recoverStockMap(data.prods, {
						// stock: {
						// 	simulate: true
						// }
					});
					setSelectedOrd(data);

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

	const createWithPurchaseOrder = useCallback(
		async ({ id }) => {
			try {
				// promptCreating();
				crud.promptCreating();
				crud.startReading("讀取中...");
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/invoices/create-with",
					bearer: token,
					params: {
						id,
					},
				});
				if (status.success) {
					const data = E021.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: {
							...data,
							Date: new Date(),
							ArrDate: new Date(),
						},
					});
					// 暫存上次讀取成功的訂貨單
					prevOrdersRef.current = data.customerOrders;
					sqtyManager.recoverStockMap(data.prods, {
						// stock: {
						// 	simulate: true
						// }
					});

					grid.initGridData(data.prods, {
						fillRows: true,
					});
					toastEx.info(`已帶入訂購單 ${id}`)

					// setTimeout(() => {
					// 	crud.promptCreating();
					// 	toastEx.info(`已帶入訂購單 ${id}`)
					// });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedReading(err);
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
					["tooltip"]: E021.getTooltips({
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
					url: "v1/sales/invoices",
					data: data,
					bearer: token,
					params: {
						mode: mode.description
					}
				}) : await httpPutAsync({
					url: "v1/sales/invoices",
					data: data,
					bearer: token,
					params: {
						mode: mode.description
					}
				});
				if (status.success) {
					toastEx.success(creating ? `新增成功` : "修改成功");
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

				console.error(`${creating ? "新增" : "修改"} 失敗`, err);
				if (err.code === 102) {
					const errorParams = sqtyManager.getErrorParams(err);

					sqtyManager.handleOverrideSQty({
						setValue, gridMeta, formData: data,
						// rowData, rowIndex, stock, submitAfterCommitted: true, 
						...errorParams,
						onCommit: ({ gridData }) => {
							handleRefreshAmt({
								gridData,
								// taxExcluded: data.taxExcluded,
								setValue,
								formData: data
							})

							const updated = mapTooltip({ gridData, rowIndex: errorParams.rowIndex })
							grid.setGridData(updated);
						}
					});
				} else {
					toastEx.error(`${creating ? "新增" : "修改"}失敗`, err);
				}
			}
		},
		[crud, httpPostAsync, token, mode, httpPutAsync, listLoader, loadItem, grid, sqtyManager, handleRefreshAmt, mapTooltip]
	);

	const cancelAction = useCallback(() => {
		crud.cancelAction();
		// purchaseOrderIdRef.current = null;
		crud.setItemData(null);
		// 清除 query params
		clearParams();
	}, [clearParams, crud]);

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			cancelAction();

			loadItem({ id: rowData.銷貨單號 });
		},
		[cancelAction, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄新增?",
			onConfirm: () => {
				cancelAction();
			},
		});
	}, [cancelAction, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄修改?",
			onConfirm: () => {
				cancelAction();
				loadItem({ refresh: true });
			},
		});
	}, [cancelAction, dialogs, loadItem]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確定要取消編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除銷貨單「${itemData?.SalID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/invoices`,
						bearer: token,
						params: {
							id: itemData?.SalID,
							mode: mode.description
						},
					});
					if (status.success) {
						// 關閉對話框
						cancelAction();
						toastEx.success(`成功删除銷貨單 ${itemData?.SalID}`);
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
	}, [cancelAction, crud, dialogs, httpDeleteAsync, itemData, listLoader, mode, token]);

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
					url: "v1/sales/invoices/prod-info",
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
					throw error ?? new Error("未預期例外");
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
				["SafeQty_N"]: prodInfo?.SafeQty_N ?? "",
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
					throw error ?? new Error("未預期例外");
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

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebE02Rep.aspx`
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
				JobName: "E021",
				IDs: crud.itemData?.SalID,
			};
			// postToBlank(
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.SalID, operator?.CurDeptID, reportUrl, reports]
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
		// grid.initGridData([], {
		// 	fillRows: true
		// });
	}, []);

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
						url: "v1/sales/invoices/refresh-grid",
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
		[grid, httpPostAsync, token, setPrevData, getPrevData]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta, gridMeta, handleRefreshGridSubmit }) => async (newValue) => {
		console.log("handleCustomerChange", newValue);
		// formMeta.asyncRef.current.supressEvents = true;
		formMeta.supressEvents();
		const formData = getValues();

		const isOrdersSelected = !!formData.customerOrders && formData.customerOrders.length > 0;

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

		if (isOrdersSelected) {
			setValue("customerOrders", []);
		} else {
			setValue("CustName", newValue?.CustData ?? "", {
				shouldTouch: true
			});
			setValue("CompTel", customerInfo?.CompTel ?? "", {
				shouldTouch: true
			});
			setValue("RecAddr", customerInfo?.RecAddr ?? "", {
				shouldTouch: true
			});
			setValue("InvAddr", customerInfo?.InvAddr ?? "", {
				shouldTouch: true
			});
			setValue("UniForm", customerInfo?.UniForm ?? "", {
				shouldTouch: true
			});

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
		}

		if (grid.gridData.filter(rowData => rowData.prod?.ProdID).length > 0) {
			handleRefreshGridSubmit();
		} else {
			console.log("grid is empty, refresh-grid not triggered")
		}

		gridMeta.setActiveCell(null);
		// formMeta.asyncRef.current.supressEvents = false;
		formMeta.enableEvents();
	}, [grid.gridData, httpGetAsync, token]);


	// const getTooltip = useCallback(({ rowData }) => {
	// 	if (!rowData.SOrdID) {
	// 		return "";
	// 	}

	// 	let results = [];

	// 	if (rowData?.SOrdID != null) {
	// 		results.push(`訂貨單號: ${rowData?.SOrdID || "(空白)"}`);
	// 	}

	// 	return results.join(", ");
	// }, []);

	const handleCustomerOrdersChanged2 = useCallback(
		({ setValue, getValues, formMeta }) =>
			async (newValue) => {
				console.log("crud.readWorking", crud.readWorking);
				console.log("handleCustomerOrdersChanged2", newValue);

				const formData = getValues();
				console.log("formData after customerOrdersChanged", formData);

				const custId = newValue?.[0]?.["客戶代碼"] ?? formData.customer?.CustID ?? "";
				const retail = newValue?.[0]?.["零售"] == "Y" || formData.retail;
				const isCustomerAlreadySelected = !!formData.customer && newValue?.[0]?.["客戶代碼"] == formData.customer?.CustID;
				// const isGuestCustomer = !custId && retail;

				// if (isGuestCustomer && newValue && newValue.length > 1) {
				// 	toastEx.error("無客編非正式客戶僅能選擇一筆訂貨單");
				// 	console.log("prevOrdersRef", prevOrdersRef.current)

				// 	prevOrdersRef.current = newValue;
				// 	return;
				// }

				// prevOrdersRef.current = newValue;

				// 訂購單空白則清空表單
				if (!newValue || newValue.length === 0) {

					updateCustomerData({ setValue, formMeta })(null);
					// 清除不列印金額註記
					updatePrtAmt({ setValue, formData: null });
					updateAmt({ setValue, formData: null, reset: true });

					grid.setGridData(
						grid.fillRows({ data: [] }), {
						supressEvents: true
					});
					console.log("grid cleared in handleCustomerOrdersChanged2");
					return;
				}
				try {
					const { status, payload, error } = await httpGetAsync({
						url: "v1/sales/invoices/load-prods",
						bearer: token,
						params: {
							cst: custId,
							ids: newValue.map(x => x["訂貨單號"]).join(","),
							retail: retail ? 1 : 0
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

						// 暫存上次讀取成功的訂貨單
						prevOrdersRef.current = data.customerOrders;

						// 當客戶已選擇才會更新客戶資料
						if (!isCustomerAlreadySelected) {
							updateCustomerData({ setValue, formMeta })(formData);
						}
						// 同步不列印金額註記
						updatePrtAmt({ setValue, formData: data });
						updateAmt({ setValue, formData: data, reset: !data });
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("載入訂購單商品失敗", err);
					if (err.code == 4 && prevOrdersRef.current) {
						setValue("customerOrders", prevOrdersRef.current);
					}
				}
			},
		[crud.readWorking, grid, httpGetAsync, token, updateAmt, updateCustomerData, updatePrtAmt]
	);

	const handleCustomerOrdersChangedOld = useCallback(
		({ setValue, getValues, reset }) =>
			async (newValue) => {
				console.log("handleCustomerOrdersChanged", newValue);
				const formData = getValues();
				console.log("formData", formData);

				if (newValue.length === 0) {
					setValue("dontPrtAmt", false);
					grid.setGridData(
						grid.fillRows({ data: [] }), {
						supressEvents: true
					});
					console.log("grid cleared in handleCustomerOrdersChanged");
					return;
				}
				try {
					const custId = newValue[0]?.["客戶代碼"] || formData.customer?.CustID;
					const retail = newValue[0]?.["零售"] || formData.retail;
					if (!custId) {
						console.error("沒有客戶代碼, load-prods 終止");
						return;
					}
					const { status, payload, error } = await httpGetAsync({
						url: "v1/sales/invoices/load-prods",
						bearer: token,
						params: {
							cst: custId,
							ids: newValue.map(x => x["訂貨單號"]).join(","),
							retail: retail ? 1 : 0
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

						// reset(formData);
						setValue("CustName", data?.CustName || "");
						setValue("CompTel", data?.CompTel || "");
						setValue("RecAddr", data?.RecAddr || "");
						setValue("InvAddr", data?.InvAddr || "");
						setValue("UniForm", data?.UniForm || "");
						setValue("transType", data?.transType || "");
						setValue("employee", data?.employee || "");
						setValue("taxExcluded", data?.taxExcluded || "");
						setValue("paymentType", data?.paymentType || "");
						// // 更新備註
						setValue("remark", data?.remark || "");

						// // 更新列印註記
						setValue("dontPrtAmt", data.dontPrtAmt ?? false);
						// // 更新數字
						updateAmt({ setValue, formData: data });
						// // toastEx.info("採購單商品已載入");

					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("載入訂購單商品失敗", err);
				}
			},
		[grid, httpGetAsync, token, updateAmt]
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
				url: "v1/sales/invoices/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.SalID,
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

	// const setPurchaseOrderToLoad = useCallback((purchaseOrderId) => {
	// 	purchaseOrderIdRef.current = purchaseOrderId;
	// }, []);

	// const pickByOrder = useCallback(async (orderId) => {
	// 	// cancelAction();
	// 	// 取得 order entity
	// 	try {
	// 		const { status, payload, error } = await httpGetAsync({
	// 			url: `v1/sales/invoices/customer-orders`,
	// 			bearer: token,
	// 			params: {
	// 				fz: orderId
	// 			}
	// 		})
	// 		if (status.success) {
	// 			console.log("loaded customer-orders", payload)
	// 			if (!payload.data || payload.data?.lenth == 0) {
	// 				throw new Error(`查無訂貨單[${orderId}]`);
	// 			}
	// 			if (payload.data.length > 1) {
	// 				throw new Error(`查到多筆訂貨單[${orderId}]`);
	// 			}
	// 			if (payload.data?.length == 1) {
	// 				const orderObj = payload.data[0];
	// 				// promptCreating([orderObj]);
	// 				loadOrderRef.current = [orderObj];
	// 				promptCreating();
	// 				// toastEx.success(`訂貨單 ${orderId} 內容已載入`)
	// 			}
	// 		} else {
	// 			throw error ?? new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 		toastEx.error(`訂貨單 ${orderId} 內容載入失敗`, err);
	// 	}
	// }, [httpGetAsync, promptCreating, token]);

	const loadOrderAction = useAction();

	const loadPurchaseOrder = useCallback(async ({ setValue, orderId }) => {
		try {
			promptCreating();
			loadOrderAction.start({ message: `載入訂貨單...` });
			const { status, payload, error } = await httpGetAsync({
				url: `v1/sales/invoices/customer-orders`,
				bearer: token,
				params: {
					fz: orderId
				}
			})
			if (status.success) {
				console.log("loaded customer-orders", payload)
				if (!payload.data || payload.data?.lenth == 0) {
					throw new Error(`查無訂貨單[${orderId}]`);
				}
				if (payload.data.length > 1) {
					throw new Error(`查到多筆訂貨單[${orderId}]`);
				}
				if (payload.data?.length == 1) {
					const orderObj = payload.data[0];
					setValue("customerOrders", [orderObj])
				}
			} else {
				throw error ?? new Error("未預期例外");
			}
			loadOrderAction.clear();
		} catch (err) {
			loadOrderAction.fail({ error: err });

		}
	}, [httpGetAsync, loadOrderAction, promptCreating, token]);

	// const promptLoadPurchaseOrder = useCallback(({ setValue, orderId }) => {
	// 	purchaseOrderIdRef.current = null;
	// 	dialogs.confirm({
	// 		message: `確定要載入訂貨單 ${orderId}?`,
	// 		onConfirm: () => {
	// 			loadPurchaseOrder({ setValue, orderId });
	// 		},
	// 	})
	// }, [dialogs, loadPurchaseOrder]);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...crud,
		//override CRUD.cancelAction
		cancelAction,
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
		handlePromptCreating,
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
		onGridChanged,
		handleTaxTypeChange,
		handleRecdAmtChange,
		// getTooltip,
		handleCustomerOrdersChangedOld,
		handleCustomerOrdersChanged2,
		committed,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// Grid 重整
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		// 調訂貨單
		// purchaseOrderIdRef,
		// pickByOrder,
		// setPurchaseOrderToLoad,
		loadPurchaseOrder,
		// promptLoadPurchaseOrder,
		loadOrderWorking: loadOrderAction.working,
		createWithPurchaseOrder,
		stypeDisabled
	};
};
