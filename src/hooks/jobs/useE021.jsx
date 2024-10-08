import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import E021 from "@/modules/md-e021";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import Forms from "@/shared-modules/sd-forms";
import Objects from "@/shared-modules/sd-objects";
import { isDate } from "lodash";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";
import useOverrideSQty from "../useOverrideSQty";

export const useE021 = () => {
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

	const createRow = useCallback(
		() => E021.createRow(),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		// keyColumn: "prod.ProdID",
		createRow
	});

	const overrideSQty = useOverrideSQty({
		grid,
	});

	const { committed } = overrideSQty;

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
			prods: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.prods, { createRow, length: 13 });
	}, [createRow, crud, grid]);

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
		async ({ taxExcluded, gridData, setValue, formData }) => {
			const total = E021.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-invoices/refresh-amt",
					bearer: token,
					data: {
						taxExcluded: taxExcluded ? 1 : 0,
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
				toast.error(Errors.getMessage("計算合計失敗", err), {
					position: "top-center"
				});
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
					setSelectedOrd(data);

					grid.initGridData(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, grid, token]
	);

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
					toast.success(creating ? `新增成功` : "修改成功");
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

					dialogs.confirm({
						message: `第 ${err.data.Row} 筆庫存(${err.data.StockQty})不足, 是否強迫銷貨?`,
						onConfirm: () => {
							overrideSQty.handleOverrideSQty({
								setValue, gridMeta, formData: data, rowData, rowIndex, stock, submitAfterCommitted: true, refreshAmt: ({ gridData }) => {
									handleRefreshAmt({
										gridData,
										taxExcluded: data.taxExcluded,
										setValue,
										formData: data
									})
								}
							});
						}
					})
				} else {
					toast.error(Errors.getMessage(creating ? `新增失敗` : `修改失敗`, err), {
						position: "top-center"
					});
				}
			}
		},
		[crud, dialogs, grid.gridData, httpPostAsync, httpPutAsync, listLoader, loadItem, overrideSQty, handleRefreshAmt, token]
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
	// 				toast.success(`修改成功`);
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
	// 							overrideSQty.handleOverrideSQty({ setValue, gridMeta });
	// 						}
	// 					})
	// 			} else {
	// 				toast.error(Errors.getMessage("修改失敗", err), {
	// 					position: "top-center"
	// 				});
	// 			}
	// 		}
	// 	},
	// 	[crud, dialogs, httpPutAsync, listLoader, loadItem, overrideSQty, token]
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
						toast.success(`成功删除銷貨單 ${itemData?.SalID}`);
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

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getProdInfo = useCallback(
		async (prodId, { formData }) => {
			if (!prodId) {
				toast.error("請先選擇商品", {
					position: "top-center"
				});
				return;
			}

			if (!isDate(formData.SalDate)) {
				toast.error("請先輸入銷貨日", {
					position: "top-center"
				});
				return;
			}

			if (!formData.customer) {
				toast.error("請先輸入客戶代碼", {
					position: "top-center"
				});
				return;
			}

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
					return {
						...payload,
						...(payload.Price && {
							["SQflag"]: "*"
						})
					};
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢報價失敗", err), {
					position: "top-center"
				});
			}
		},
		[httpGetAsync, token]
	);



	const handleTaxTypeChange = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("onTaxTypeChanged", newValue);
				const formData = getValues();
				console.log("formData", formData);
				handleRefreshAmt({
					gridData: grid.gridData,
					taxExcluded: newValue,
					setValue,
					formData
				});
			},
		[handleRefreshAmt, grid.gridData]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData, formData }) => {
			let processedRowData = { ...rowData };

			const customer = formData.customer;

			const prodInfo = rowData?.prod?.ProdID
				? customer ? await getProdInfo(rowData?.prod?.ProdID, {
					formData
				}) : {
					Price: rowData.prod.Price
				}
				: null;

			processedRowData = {
				...processedRowData,
				["prod"]: prodInfo ? processedRowData.prod : null,
				["ProdData_N"]: prodInfo ? processedRowData.prod?.ProdData || "" : "",
				["PackData_N"]: processedRowData?.prod?.PackData_N || "",
				["SQflag"]: prodInfo?.SQflag || "",
				["SPrice"]: prodInfo?.Price || "",
				["StockQty"]: prodInfo?.StockQty || "",
				["SQty"]: "",
				["SAmt"]: "",
				["stype"]: null,
				["SRemark"]: "",
				["SNotQty"]: "",
				["SQtyNote"]: "",

			};
			return processedRowData;
		},
		[getProdInfo]
	);

	const onUpdateRow = useCallback(({ fromIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);

		let processedRowData = {
			...rowData,
		};

		// let employee = formData["employee"];
		// let date = formData["Date"];

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
				rowData,
				oldRowData,
				formData,
				newValue
			});
		}

		// 數量改變
		if (processedRowData.SQty !== oldRowData.SQty) {
			processedRowData = overrideSQty.handleGridSQtyChange({
				rowData: processedRowData,
				gridData: newValue,
				rowIndex,
				setValue,
				gridMeta,
				// 透過對話框等操作直接更新 SQty 不會觸發 GridChange, 所以必須帶上 refreshAmt 處理函式
				refreshAmt: ({ gridData }) => {
					handleRefreshAmt({
						gridData,
						taxExcluded: formData.taxExcluded,
						setValue,
						formData
					});
				}
			});

			// 新增時, 數量會同步到未進量
			if (crud.creating) {
				processedRowData = {
					...processedRowData,
					["SNotQty"]: rowData.SQty,
				};
			}
		}

		// 單價
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
			updateResult.rows++;
		}

		// 未進量改變
		if (processedRowData.SNotQty !== oldRowData.SNotQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]:
					processedRowData.SNotQty === 0 ? 0 : processedRowData.SQty - processedRowData.SOutQty,
			};
		}
		return processedRowData;
	}, [crud.creating, grid.gridData, handleGridProdChange, overrideSQty]);

	const onGridChanged = useCallback(({ gridData, formData, setValue }) => {
		console.log("onGridChanged", gridData);
		handleRefreshAmt({
			gridData,
			taxExcluded: formData.taxExcluded,
			setValue,
			formData
		});
	}, [handleRefreshAmt]);

	const buildGridChangeHandlerOld = useCallback(
		({ gridMeta, getValues }) => async (newValue, operations) => {
			console.log("prevGridData", grid.prevGridData);
			console.log("gridData", grid.gridData);
			console.log("buildGridChangeHandler", operations);
			const newGridData = [...newValue];
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const oldRowData = grid.gridData[rowIndex];

							let processedRowData = { ...rowData };

							if (
								rowData.prod?.ProdID !==
								oldRowData?.prod?.ProdID
							) {
								console.log(
									`[${rowIndex}]prod changed`,
									rowData?.prod
								);
								processedRowData = handleGridProdChange({
									rowData,
									oldRowData,
									getValues
								});
							}

							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					newGridData.splice(operation.fromRowIndex, operation.toRowIndex - operation.fromRowIndex + 1);
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					gridMeta.toFirstColumn({ nextRow: true });
				}
			}
			console.log("after changed", newGridData);
			grid.setGridData(newGridData);
		},
		[grid, handleGridProdChange]
	);

	const onEditorSubmit = useCallback(
		({ setValue, gridMeta }) => (data) => {
			overrideSQty.setCommitted(false);
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
		[grid.gridData, handleSave, overrideSQty]
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
				toast.error(Errors.getMessage("篩選失敗", err), {
					position: "top-center"
				});
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
						createRow,
					});
					toast.success(`成功帶入 ${data.length} 筆商品`);
					importProdsAction.clear();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				importProdsAction.fail(err);
				toast.error(Errors.getMessage("帶入商品發生錯誤", err), {
					position: "top-center"
				});
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
				`${import.meta.env.VITE_URL_REPORT}/WebE02Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.SalID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
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

	const handleRetailChange = useCallback(({ setValue }) => (newValue) => {
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
	}, []);

	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta }) => async (newValue) => {
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
				toast.error(Errors.getMessage("讀取客戶資料發生錯誤", err), {
					position: "top-center"
				});
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

		formMeta.asyncRef.current.supressEvents = false;
	}, [httpGetAsync, token]);


	const getTooltip = useCallback((rowData) => {
		let results = [];

		if (rowData?.SOrdID != null) {
			results.push(`訂貨單號: ${rowData?.SOrdID || "(空白)"}`);
		}

		return results.join(", ");
	}, []);

	const handleCustomerOrdersChanged = useCallback(
		({ setValue, getValues }) =>
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
						// 更新 grid
						grid.setGridData(
							grid.fillRows({ data: data.prods }), {
							supressEvents: true
						});
						// 更新列印註記
						setValue("dontPrtAmt", data.dontPrtAmt);
						// 更新數字
						updateAmt({ setValue, formData: data });
						// toast.info("採購單商品已載入");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入訂購單商品失敗", err), {
						position: "top-center"
					});
				}
			},
		[grid, httpGetAsync, updateAmt, token]
	);

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
		buildGridChangeHandlerOld,
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
		getTooltip,
		handleCustomerOrdersChanged,
		committed
	};
};
