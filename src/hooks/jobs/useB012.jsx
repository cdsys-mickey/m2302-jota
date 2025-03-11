import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { toastEx } from "@/helpers/toast-ex";
import B012 from "@/modules/md-b012";
import B02 from "@/modules/md-b02";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/sd-objects";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useB012 = (opts = {}) => {
	const { forNew } = opts;

	const JOB_NAME = useMemo(() => {
		return forNew ? "B032" : "B012"
	}, [forNew]);

	const API_URL = useMemo(() => {
		return forNew ? "v1/quote/new-customer-quotes" : "v1/quote/customer-quotes"
	}, [forNew]);

	const GRID_URL = useMemo(() => {
		return forNew ? "v1/sales/customer/data-grid/B032" : "v1/sales/customer/data-grid/B012"
	}, [forNew]);

	const crud = useContext(CrudContext);
	const auth = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: JOB_NAME,
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);



	const listLoader = useInfiniteLoader({
		url: `${API_URL}/find-by-prod`,
		bearer: token,
		initialFetchSize: 50,
		params: {
			sort: B02.OrderBy.PROD
		}
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			customer: null,
			CustData_N: "",
			Price: "",
			QPrice: "",
			QDate: null,
			employee: null
		}),
		[]
	);

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "Pkey",
		createRow
	});

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			InqDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, {
			fillRows: 13
		});
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: `${API_URL}/by-prod`,
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
		[API_URL, crud, httpPostAsync, listLoader, token]
	);

	// READ
	const loadItem = useCallback(
		async ({ prd, emp, dat, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : { prd, emp, dat };
				if (!refresh) {
					itemIdRef.current = itemId;
					crud.startReading("讀取中...", { itemId });
				}
				const { status, payload, error } = await httpGetAsync({
					url: `${API_URL}/by-prod`,
					bearer: token,
					params: {
						...itemId,
					},
				});
				if (status.success) {
					const data = B012.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					setSelectedInq(data);

					grid.initGridData(data.quotes);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[httpGetAsync, API_URL, token, crud, grid]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			crud.cancelAction();

			loadItem({ prd: rowData.ProdID, emp: rowData.QEmplID });
		},
		[crud, loadItem]
	);

	const handleProdChange = useCallback(({ setValue }) => (newValue) => {
		setValue("Price", newValue?.Price || "");
	}, []);

	const handleSelectDate = useCallback((e, rowData) => {
		console.log("handleSelectDate", rowData);
		e?.stopPropagation();
		crud.cancelAction();
		loadItem({ prd: rowData.ProdID, emp: rowData.QEmplID, dat: rowData.QDate });
	}, [crud, loadItem]);

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
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/quote/customer-quotes/by-prod",
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
	// 			toastEx.error("修改失敗", err));
	// 		}
	// 	},
	// 	[crud, httpPutAsync, listLoader, loadItem, token]
	// );

	const handlePatch = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPatchAsync({
					url: `${API_URL}/by-prod`,
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
		[API_URL, crud, httpPatchAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除詢價單「${itemData?.InqID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `${API_URL}/by-prod`,
						bearer: token,
						params: {
							id: itemData?.InqID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除詢價單 ${itemData?.InqID}`);
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
	}, [API_URL, crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const handleGridCustChange = useCallback(
		({ rowData, newValue }) => {
			let processedRowData = { ...rowData };

			// 建立時檢查是否重複
			if (
				crud.creating &&
				processedRowData.customer &&
				grid.isDuplicating(rowData, newValue, { key: "customer.CustID" })
			) {
				toastEx.error(`「${processedRowData.customer?.CustData}」已存在, 請選擇其他客戶`, {
					position: "top-right"
				});
				processedRowData.customer = null;
			}

			processedRowData = {
				...processedRowData,
				["CustData_N"]: processedRowData?.customer?.CustData || "",
				["QPrice"]: "",
			};
			return processedRowData;
		},
		[crud.creating, grid]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);

		let processedRowData = {
			...rowData,
		};

		// let employee = formData["employee"];
		// let date = formData["Date"];

		if (
			rowData.customer?.CustID !==
			oldRowData?.customer?.CustID
		) {
			console.log(
				`[${rowIndex}]customer changed`,
				rowData?.customer
			);
			processedRowData = handleGridCustChange({
				rowData,
				oldRowData,
				formData,
				newValue
			});
		}
		return processedRowData;
	}, [grid.gridData, handleGridCustChange]);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);

			if (crud.creating) {
				const collected = B012.transformForCreating(
					data,
					grid.gridData
				);
				console.log("collected", collected);
				handleCreate({ data: collected });
			} else if (crud.updating) {
				const collected = B012.transformForUpdating(
					data,
					grid.getDirtyRows()
				);
				const submitted = {
					data: [
						collected
					],
					delete: [
						...grid.deletedIds
					]
				}
				console.log("submitted", submitted);
				handlePatch({ data: submitted });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, grid, handleCreate, handlePatch]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// console.log(`getRowKey, rowIndex: ${rowIndex}, rowData:`, rowData);
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	// 帶入商品
	const importCustsAction = useAction();

	const [ipState, setIpState] = useState({
		criteria: null,
		saveKey: null,
		totalElements: null,
		loading: false,
	});

	const peekCusts = useCallback(
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
					url: GRID_URL,
					bearer: token,
					params: {
						...B012.transformCustCriteriaAsQueryParams(criteria),
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
		[GRID_URL, httpGetAsync, ipState.saveKey, token]
	);

	const onImportCustsSubmit = useCallback(
		({ form }) => async (data) => {
			console.log("onImportCustsSubmit", data);
			try {
				importCustsAction.start();
				const { status, payload, error } = await httpGetAsync({
					url: GRID_URL,
					bearer: token,
					params: {
						...B012.transformCustCriteriaAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].B012032_W1 || [];
					console.log("data", data);
					const formData = form.getValues();
					grid.initGridData(B012.transformForGridImport(data, formData?.employee, formData?.Date), {
						fillRows: true,
					});
					toastEx.success(`成功帶入 ${data.length} 筆客戶`);
					importCustsAction.clear();
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				importCustsAction.fail({ error: err });
				toastEx.error("帶入客戶發生錯誤", err);
			}
		},
		[importCustsAction, httpGetAsync, GRID_URL, token, ipState.criteria, ipState.saveKey, grid]
	);

	const onImportCustsSubmitError = useCallback((err) => {
		console.error("onImportCustsSubmitError", err);
	}, []);

	//列印
	const printAction = useAction();

	const onPrintPromptSubmit = useCallback((data) => {
		console.log("onPrintPromptSubmit", data);
		printAction.prompt({
			params: data
		});
	}, [printAction])

	const onPrintPromptSubmitError = useCallback((err) => {
		console.error("onPrintPromptSubmitError", err);
	}, [])

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebB012032Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		async (payload) => {
			console.log("onPrintSubmit", payload);
			// fetch ListView data
			const { status, payload: fetchPayload, error } = await httpGetAsync({
				bearer: auth.token,
				url: `${API_URL}/find-by-prod`,
				params: {
					sort: B02.OrderBy.PROD,
					...listLoaderCtx.paramsRef.current,
				}
			});
			if (status.success) {
				console.log("payload", fetchPayload.data);
				if (!fetchPayload.data?.length) {
					toastEx.error("目前查詢沒有資料", {
						position: "top-right"
					})
					return;
				}
			} else {
				toastEx.error("讀取資料發生錯誤", error);
				return;
			}
			const { prtEmployee, prtDate } = payload;
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: JOB_NAME,
				ProdID: printAction.params?.lvProd?.ProdID || "",
				QEmplID: prtEmployee?.CodeID || "",
				QDate: Forms.formatDate(prtDate),
				B012032_W1: fetchPayload.data ?
					fetchPayload.data?.map(x => ({
						CustID: x.CustID,
						Price: x.Price,
						QPrice: x.QPrice
					}))
					: []
			};
			// console.log("jsonData", jsonData);
			// postToBlank(
			// 	`${config.REPORT_URL}/WebB012032Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(jsonData),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[API_URL, JOB_NAME, auth.token, httpGetAsync, listLoaderCtx.paramsRef, operator?.CurDeptID, printAction.params?.lvProd?.ProdID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
	}, []);

	const importCustsFormMeta = useFormMeta(
		`
		cust,
		cust2,
		area,
		channel
		`
	)

	return {
		...crud,
		...listLoader,
		...appModule,
		selectedInq,
		loadItem,
		handleSelect,
		handleSelectDate,
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
		...grid,
		grid,
		onUpdateRow,
		getRowKey,
		// 帶入商品
		importCustsWorking: importCustsAction.working,
		promptImportCusts: importCustsAction.prompt,
		cancelImportCusts: importCustsAction.clear,
		importCustsDialogOpen: importCustsAction.active,
		onImportCustsSubmit: onImportCustsSubmit,
		onImportCustsSubmitError,
		peekCusts,
		ipState,
		// 列印
		cancelPrint: printAction.clear,
		printDialogOpen: printAction.active,
		onPrintPromptSubmit,
		onPrintPromptSubmitError,
		onPrintSubmit,
		onPrintSubmitError,
		// handleLastField,
		importCustsFormMeta,
		handleProdChange,
		...sideDrawer,
		forNew,
		handlePrint
	};
};
