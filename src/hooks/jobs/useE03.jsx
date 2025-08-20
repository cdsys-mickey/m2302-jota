import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import E03 from "@/modules/E03.mjs";
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
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useE03 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "E03",
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
		url: "v1/sales/customer-return-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => E03.createRow(),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		createRow
	});

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SQflag || !!rowData.stype;
	}, []);


	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			RetDate: new Date(),
			taxExcluded: false,
			retail: false,
			RetAmt: 0,
			prods: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.prods, {
			fillRows: 13
		});
	}, [crud, grid]);

	const updateAmt = useCallback(({ setValue, formData, reset = false }) => {
		if (reset) {
			setValue("RetAmt", "");
			setValue("TaxAmt", "");
			setValue("TotAmt", "");
			setValue("RecdAmt", "");
			setValue("RedAmt", "");
		} else {
			setValue("RetAmt", formData.RetAmt);
			setValue("TaxAmt", formData.TaxAmt);
			setValue("TotAmt", formData.TotAmt);
			setValue("RecdAmt", formData.RecdAmt);
			setValue("RedAmt", formData.RedAmt);
		}
	}, []);

	const handleRefreshAmt = useCallback(
		async ({ gridData, setValue, formData }) => {
			const total = E03.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/customer-return-orders/refresh-amt",
					bearer: token,
					data: {
						taxExcluded: formData.taxExcluded ? 1 : 0,
						returningAmt: total,
						returnedAmt: formData.RfdAmt
					},
				});
				if (status.success) {
					console.log("refresh-amt", payload);
					setValue("RetAmt", total.toString());
					setValue("TaxAmt", payload.TaxAmt);
					setValue("TotAmt", payload.TotAmt);
					setValue("RedAmt", payload.RedAmt);
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
					url: "v1/sales/customer-return-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {

					const data = E03.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: data,
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
		[httpGetAsync, token, crud, grid]
	);

	const handleSave = useCallback(
		async ({ data }) => {
			const creating = crud.creating;
			try {
				if (creating) {
					crud.startCreating();
				} else {
					crud.startUpdating();
				}

				const httpMethod = creating ? httpPostAsync : httpPutAsync;

				const { status, error } = await httpMethod({
					url: "v1/sales/customer-return-orders",
					data: data,
					bearer: token,
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

				console.error(`${creating ? "新增" : "修改"}失敗`, err);
				toastEx.error(`${creating ? "新增" : "修改"}失敗`, err);
			}
		},
		[crud, httpPostAsync, httpPutAsync, listLoader, loadItem, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			crud.cancelAction();

			loadItem({ id: rowData.銷退單號 });
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

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除銷退單「${itemData?.RetID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/customer-return-orders`,
						bearer: token,
						params: {
							id: itemData?.RetID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除銷退單 ${itemData?.RetID}`);
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

			if (!isDate(formData.RetDate)) {
				toastEx.error("請先輸入銷退日", {
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
					url: "v1/sales/customer-return-orders/prod-info",
					bearer: token,
					params: {
						id: prodId,
						retail: formData.retail ? 1 : 0,
						cst: formData.customer?.CustID || "",
						rdate: Forms.formatDate(formData.RetDate),
						compTel: formData.CompTel || ""
					},
				});

				if (status.success) {
					// return {
					// 	...payload,
					// 	...(payload.Price && {
					// 		["SQflag"]: "*"
					// 	})
					// };
					return payload;
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢報價失敗", err);
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
					setValue,
					formData: {
						...formData,
						taxExcluded: newValue
					}
				});
			},
		[handleRefreshAmt, grid.gridData]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData, formData }) => {
			let processedRowData = { ...rowData };

			// const customer = formData.customer;
			const retail = formData.retail;

			const prodInfo = rowData?.prod?.ProdID
				? await getProdInfo(rowData?.prod?.ProdID, {
					formData
				})
				: null;

			processedRowData = {
				...processedRowData,
				["prod"]: prodInfo ? processedRowData.prod : null,
				["ProdData_N"]: prodInfo ? processedRowData.prod?.ProdData || "" : "",
				["PackData_N"]: prodInfo ? processedRowData?.prod?.PackData_N || "" : "",
				["SQflag"]: (prodInfo && !retail) ? "*" : "",
				["SPrice"]: prodInfo?.SPrice || "",
				["SQty"]: "",
				["SAmt"]: "",
				["stype"]: null,
				["dtype"]: null,
				["SRemark"]: "",

			};
			return processedRowData;
		},
		[getProdInfo]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);

		let processedRowData = {
			...rowData,
		};


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
			updateResult.rows++;
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	const onGridChanged = useCallback(({ gridData, formData, setValue }) => {
		console.log("onGridChanged", gridData);
		handleRefreshAmt({
			gridData,
			setValue,
			formData
		});
	}, [handleRefreshAmt]);

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

	const onEditorSubmit = useCallback((data) => {
		console.log("onEditorSubmit", data);
		const collected = E03.transformForSubmitting(
			data,
			grid.gridData
		);
		console.log("collected", collected);
		handleSave({ data: collected });
	},
		[grid.gridData, handleSave]
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
					url: "v1/prod/data-grid/E03",
					bearer: token,
					params: {
						...E03.transformProdCriteriaAsQueryParams(criteria),
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
					url: "v1/prod/data-grid/E03",
					bearer: token,
					params: {
						...E03.transformProdCriteriaAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].E03031_W1 || [];
					console.log("data", data);
					const formData = form.getValues();
					grid.initGridData(E03.transformForGridImport(data, formData?.employee, formData?.Date), {
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
		return `${config.REPORT_URL}/WebE03Rep.aspx`
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
				JobName: "E03",
				IDs: crud.itemData?.RetID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebE03Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.RetID, operator?.CurDeptID, reportUrl, reports]
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
		setValue("RfdAmt", "");
		gridMeta.setActiveCell(null);
		grid.initGridData([], {
			fillRows: true
		});
	}, [grid]);

	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta, gridMeta }) => async (newValue) => {
		console.log("handleCustomerChange", newValue);
		// formMeta.asyncRef.current.supressEvents = true;
		formMeta.supressEvents();
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


		setValue("transType", E03.getTransType(customerInfo), {
			shouldTouch: true
		});
		setValue("taxExcluded", E03.getTaxExcluded(customerInfo), {
			shouldTouch: true
		});
		setValue("paymentType", E03.getPaymentType(customerInfo), {
			shouldTouch: true
		});
		setValue("employee", E03.getEmployee(customerInfo), {
			shouldTouch: true
		});

		setValue("RfdAmt", "");
		gridMeta.setActiveCell(null);
		// formMeta.asyncRef.current.supressEvents = false;
		formMeta.enableEvents();
	}, [httpGetAsync, token]);


	const handleRfdAmtChange = useCallback(({ setValue, getValues }) => (newValue) => {
		console.log("handleRfdAmtChange", newValue);
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
				url: "v1/sales/customer-return-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.RetID,
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
		handlePrint,
		// handleLastField,
		loadProdFormMeta,
		...sideDrawer,
		squaredDisabled,
		handleRetailChange,
		handleCustomerChange,
		getSPriceClassName,
		spriceDisabled,
		onGridChanged,
		handleTaxTypeChange,
		handleRfdAmtChange,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
	};
};
