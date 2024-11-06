import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import E01 from "@/modules/md-e01";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import Objects from "@/shared-modules/sd-objects";
import { nanoid } from "nanoid";
import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";
import { useMemo } from "react";
import { isDate } from "lodash";
import Forms from "@/shared-modules/sd-forms";

export const useE01 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
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

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		// keyColumn: "prod.ProdID",
	});

	const createRow = useCallback(
		() => E01.createRow(),
		[]
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
		return rowData?.SNotQty && Number(rowData?.SNotQty) <= 0;
	}, []);

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
		grid.initGridData(data.prods, { createRow, length: 13 });
	}, [createRow, crud, grid]);

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
				toast.error(Errors.getMessage("新增失敗", err), {
					position: "top-center"
				});
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
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除訂貨單 ${itemData?.OrdID}`);
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

			if (!isDate(formData.OrdDate)) {
				toast.error("請先輸入訂貨日", {
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
				toast.error(Errors.getMessage("計算合計失敗", err), {
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
				// console.log("formData", formData);
				fetchAmt({
					gridData: grid.gridData,
					taxExcluded: newValue,
					setValue
				});
			},
		[fetchAmt, grid.gridData]
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

			};
			return processedRowData;
		},
		[getProdInfo]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);

		let processedRowData = {
			...rowData,
		};

		// let employee = formData["employee"];
		// let date = formData["Date"];
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
				oldRowData,
				formData,
				newValue
			});
		}

		// 數量改變
		if (processedRowData.SQty !== oldRowData.SQty) {
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
			dirty = true;
		}

		// 未進量改變
		if (rowData.SNotQty !== oldRowData.SNotQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]:
					rowData.SNotQty === 0 ? 0 : rowData.SQty - rowData.SOutQty,
			};
		}
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [crud.creating, grid.gridData, handleGridProdChange]);

	const onGridChanged = useCallback(({ gridData, formData, setValue }) => {
		console.log("onGridChanged", gridData);
		fetchAmt({
			gridData,
			taxExcluded: formData.taxExcluded,
			setValue
		});
	}, [fetchAmt]);

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
					toast.success(`成功帶入 ${data.length} 筆商品`);
					importProdsAction.clear();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				importProdsAction.fail({ error: err });
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
				JobName: "E01",
				IDs: crud.itemData?.OrdID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebE01Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.OrdID,
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
		grid.initGridData([], { createRow });
	}, [createRow, grid]);

	const handleCustomerChange = useCallback(({ setValue, getValues, formMeta, gridMeta }) => async (newValue) => {
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
		// grid.initGridData([], { createRow });
		gridMeta.setActiveCell(null);
		formMeta.asyncRef.current.supressEvents = false;
	}, [httpGetAsync, token]);

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
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
	};
};
