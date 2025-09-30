import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import toastEx from "@/helpers/toastEx";
import B011 from "@/modules/md-b011";
import B02 from "@/modules/md-b02";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/Forms.mjs";
import Objects from "@/shared-modules/Objects.mjs";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useB011 = (opts = {}) => {
	const { forNew } = opts;

	const API_URL = useMemo(() => {
		return forNew
			? "v1/quote/new-customer-quotes"
			: "v1/quote/customer-quotes";
	}, [forNew]);

	const GRID_URL = useMemo(() => {
		return forNew ? "v1/prod/data-grid/B031" : "v1/prod/data-grid/B011";
	}, [forNew]);

	const JOB_NAME = useMemo(() => {
		return forNew ? "B031" : "B011";
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

	const { httpGetAsync, httpPostAsync, httpPatchAsync, httpDeleteAsync } =
		useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: `${API_URL}/find-by-cust`,
		bearer: token,
		initialFetchSize: 50,
		params: {
			sort: B02.OrderBy.SUPPLIER,
		},
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			ProdData_N: "",
			PackData_N: "",
			Price: "",
			QPrice: "",
			QDate: null,
			employee: null,
		}),
		[]
	);

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "Pkey",
		createRow,
	});

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			dlgDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, { fillRows: 13 });
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: `${API_URL}/by-cust`,
					data: data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`新增成功`);
					crud.finishedCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedCreating();
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
			}
		},
		[API_URL, crud, httpPostAsync, listLoader, token]
	);

	// READ
	const loadItem = useCallback(
		async ({ cst, emp, dat, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : { cst, emp, dat };
				if (!refresh) {
					itemIdRef.current = itemId;
					crud.startReading("讀取中...", { itemId });
				}
				const { status, payload, error } = await httpGetAsync({
					url: `${API_URL}/by-cust`,
					bearer: token,
					params: {
						...itemId,
					},
				});
				if (status.success) {
					const data = B011.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: data,
					});
					setSelectedInq(data);

					grid.initGridData(data.quotes);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedReading(err);
			}
		},
		[httpGetAsync, API_URL, token, crud, grid]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			console.log("handleSelect", rowData);
			e?.stopPropagation();
			crud.cancelAction();

			loadItem({ cst: rowData.CustID, emp: rowData.QEmplID });
		},
		[crud, loadItem]
	);

	const handleSelectDate = useCallback(
		(e, rowData) => {
			console.log("handleSelectDate", rowData);
			e?.stopPropagation();
			crud.cancelAction();
			loadItem({
				cst: rowData.CustID,
				emp: rowData.QEmplID,
				dat: rowData.QDate,
			});
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
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			const { status, error } = await httpPutAsync({
	// 				url: "v1/quote/customer-quotes/by-cust",
	// 				data,
	// 				bearer: token,
	// 			});
	// 			if (status.success) {
	// 				toastEx.success(`修改成功`);
	// 				crud.finishedUpdating();
	// 				//crud.cancelReading();
	// 				loadItem({ refresh: true });
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error ?? new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedUpdating();
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
					url: `${API_URL}/by-cust`,
					data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`修改成功`);
					crud.finishedUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedUpdating();
				console.error("handleCreate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[API_URL, crud, httpPatchAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除客戶報價單「${itemData?.InqID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `${API_URL}/by-cust`,
						bearer: token,
						params: {
							id: itemData?.InqID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(
							`成功删除客戶報價單 ${itemData?.InqID}`
						);
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
	}, [API_URL, crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const handleGridProdChange = useCallback(
		({ rowData, newValue, formData }) => {
			let processedRowData = { ...rowData };

			// 建立時檢查是否重複
			if (
				crud.creating &&
				processedRowData.prod &&
				grid.isDuplicating(rowData, newValue, { key: "prod.ProdID" })
			) {
				toastEx.error(
					`「${processedRowData.prod?.ProdData}」已存在, 請選擇其他商品`
				);
				processedRowData.prod = null;
			}

			processedRowData = {
				...processedRowData,
				["QPrice"]: "",
				["Price"]: processedRowData?.prod?.Price || "",
				["PackData_N"]: processedRowData?.prod?.PackData_N || "",
				["ProdData_N"]: processedRowData?.prod?.ProdData || "",
			};
			return processedRowData;
		},
		[crud.creating, grid]
	);

	const onUpdateRow = useCallback(
		({ fromRowIndex, formData, newValue }) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex} 列...`, rowData);

				let processedRowData = {
					...rowData,
				};

				// let employee = formData["employee"];
				// let date = formData["Date"];

				if (rowData.prod?.ProdID !== oldRowData?.prod?.ProdID) {
					console.log(`[${rowIndex}]prod changed`, rowData?.prod);
					processedRowData = handleGridProdChange({
						rowData,
						oldRowData,
						formData,
						newValue,
					});
				}
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange]
	);

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

			if (crud.creating) {
				const collected = B011.transformForCreating(
					data,
					grid.gridData
				);
				console.log("collected", collected);
				handleCreate({ data: collected });
			} else if (crud.updating) {
				const collected = B011.transformForUpdating(
					data,
					grid.getDirtyRows()
				);
				const submitted = {
					data: [collected],
					delete: [...grid.deletedIds],
				};
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
		toastEx.error("資料驗證失敗, 請檢查並修正標註錯誤的欄位後，再重新送出");
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
					url: GRID_URL,
					bearer: token,
					params: {
						...B011.transformProdCriteriaAsQueryParams(criteria),
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

	const onImportProdsSubmit = useCallback(
		({ form }) =>
			async (data) => {
				console.log("onImportProdsSubmit", data);
				try {
					importProdsAction.start();
					const { status, payload, error } = await httpGetAsync({
						url: GRID_URL,
						bearer: token,
						params: {
							...B011.transformProdCriteriaAsQueryParams(
								ipState.criteria
							),
							sk: ipState.saveKey,
						},
					});
					if (status.success) {
						const data = payload.data?.[0].B011031_W1 || [];
						console.log("data", data);
						const formData = form.getValues();
						grid.initGridData(
							B011.transformForGridImport(
								data,
								formData?.employee,
								formData?.Date
							),
							{
								fillRows: true,
							}
						);
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
			importProdsAction,
			httpGetAsync,
			GRID_URL,
			token,
			ipState.criteria,
			ipState.saveKey,
			grid,
		]
	);

	const onImportProdsSubmitError = useCallback((err) => {
		console.error("onImportProdsSubmitError", err);
	}, []);

	// const handlePrint = useCallback(() => {
	// 	printAction.prompt();
	// }, [printAction]);

	//列印
	const printAction = useAction();

	const onPrintPromptSubmit = useCallback(
		(data) => {
			console.log("onPrintPromptSubmit", data);
			printAction.prompt({
				params: data,
			});
		},
		[printAction]
	);

	const onPrintPromptSubmitError = useCallback((err) => {
		console.error("onPrintPromptSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebB011031Rep.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		async (payload) => {
			console.log("onPrintSubmit", payload);

			// fetch ListView data
			const {
				status,
				payload: fetchPayload,
				error,
			} = await httpGetAsync({
				bearer: auth.token,
				url: `${API_URL}/find-by-cust`,
				params: {
					sort: B02.OrderBy.SUPPLIER,
					...listLoaderCtx.paramsRef.current,
				},
			});
			if (status.success) {
				console.log("payload", fetchPayload.data);
				if (!fetchPayload.data?.length) {
					toastEx.error("目前查詢沒有資料", {
						position: "top-right",
					});
					return;
				}
			} else {
				toastEx.error("讀取資料發生錯誤", error);
				return;
			}

			// const { prtEmployee, prtDate } = payload;
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: JOB_NAME,
				CustID: printAction.params?.lvCust?.CustID || "",
				QEmplID: payload.prtEmployee?.CodeID || "",
				QDate: Forms.formatDate(payload.prtDate),
				B011031_W1: fetchPayload.data
					? fetchPayload.data?.map((x) => ({
							ProdID: x.ProdID,
							Price: x.Price,
							QPrice: x.QPrice,
					  }))
					: [],
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[
			API_URL,
			JOB_NAME,
			auth.token,
			httpGetAsync,
			listLoaderCtx.paramsRef,
			operator?.CurDeptID,
			printAction.params?.lvCust?.CustID,
			reportUrl,
			reports,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("handlePrint", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

	const loadProdFormMeta = useFormMeta(
		`
		sprod,
		eprod,
		typeA,
		catL,
		catM,
		catS
		`
	);

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
		// handlePrint,
		onPrintPromptSubmit,
		onPrintPromptSubmitError,
		cancelPrint: printAction.clear,
		printDialogOpen: printAction.active,
		onPrintSubmit,
		onPrintSubmitError,
		// handleLastField,
		loadProdFormMeta,
		...sideDrawer,
		forNew,
		handlePrint,
	};
};
