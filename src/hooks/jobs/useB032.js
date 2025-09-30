import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/helpers/toastEx";
import B02 from "@/modules/md-b02";
import B032 from "@/modules/md-b032";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Objects from "@/shared-modules/Objects.mjs";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useB032 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "B032",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/quote/new-customer-quotes",
		bearer: token,
		initialFetchSize: 50,
		params: {
			sort: B02.OrderBy.PROD,
		},
	});

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "Pkey",
		// keyColumn: "customer.CustID",
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			customer: null,
			CustData_N: "",
			Price: "",
			QPrice: "",
			QDate: null,
			employee: null,
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			InqDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, {
			fillRows: 13,
		});
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/quote/new-customer-quotes/by-prod",
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
		[crud, httpPostAsync, listLoader, token]
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
					url: "v1/quote/new-customer-quotes/by-prod",
					bearer: token,
					params: {
						...itemId,
					},
				});
				if (status.success) {
					const data = B032.transformForReading(payload.data[0]);
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
		[crud, httpGetAsync, grid, token]
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

	const handleProdChange = useCallback(
		({ setValue }) =>
			(newValue) => {
				setValue("Price", newValue?.Price || "");
			},
		[]
	);

	const handleSelectDate = useCallback(
		(e, rowData) => {
			console.log("handleSelectDate", rowData);
			e?.stopPropagation();
			crud.cancelAction();
			loadItem({
				prd: rowData.ProdID,
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
	// 				url: "v1/quote/new-customer-quotes/by-prod",
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
					url: "v1/quote/new-customer-quotes/by-prod",
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
		[crud, httpPatchAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除詢價單「${itemData?.InqID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/quote/new-customer-quotes/by-prod`,
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

	const handleGridCustChange = useCallback(({ rowData, newValue }) => {
		let processedRowData = { ...rowData };

		processedRowData = {
			...processedRowData,
			["CustData_N"]: processedRowData?.customer?.CustData || "",
			["QPrice"]: "",
		};
		return processedRowData;
	}, []);

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

				if (rowData.customer?.CustID !== oldRowData?.customer?.CustID) {
					console.log(
						`[${rowIndex}]customer changed`,
						rowData?.customer
					);
					processedRowData = handleGridCustChange({
						rowData,
						oldRowData,
						formData,
						newValue,
					});
				}
				return processedRowData;
			},
		[grid.gridData, handleGridCustChange]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);

			if (crud.creating) {
				const collected = B032.transformForCreating(
					data,
					grid.gridData
				);
				console.log("collected", collected);
				handleCreate({ data: collected });
			} else if (crud.updating) {
				const collected = B032.transformForUpdating(
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
					url: "v1/sales/customer/data-grid/B032",
					bearer: token,
					params: {
						...B032.transformCustCriteriaAsQueryParams(criteria),
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

	const onImportCustsSubmit = useCallback(
		({ form }) =>
			async (data) => {
				console.log("onImportCustsSubmit", data);
				try {
					importCustsAction.start();
					const { status, payload, error } = await httpGetAsync({
						url: "v1/sales/customer/data-grid/B032",
						bearer: token,
						params: {
							...B032.transformCustCriteriaAsQueryParams(
								ipState.criteria
							),
							sk: ipState.saveKey,
						},
					});
					if (status.success) {
						const data = payload.data?.[0].B012032_W1 || [];
						console.log("data", data);
						const formData = form.getValues();
						grid.initGridData(
							B032.transformForGridImport(
								data,
								formData?.employee,
								formData?.Date
							),
							{
								fillRows: true,
							}
						);
						toastEx.success(`成功帶入 ${data.length} 筆客戶`);
						importCustsAction.clear();
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					importCustsAction.fail({ error: err });
					toastEx.error("帶入新客戶發生錯誤", err);
				}
			},
		[
			httpGetAsync,
			importCustsAction,
			ipState.criteria,
			ipState.saveKey,
			grid,
			token,
		]
	);

	const onImportCustsSubmitError = useCallback((err) => {
		console.error("onImportCustsSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebB012032Rep.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "B032",
				IDs: crud.itemData?.InqID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebB012032Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.InqID, operator?.CurDeptID, reportUrl, reports]
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

	const importCustsFormMeta = useFormMeta(
		`
		cust,
		cust2,
		area,
		channel
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
		onPrintSubmit,
		onPrintSubmitError,
		// handleLastField,
		importCustsFormMeta,
		handleProdChange,
		...sideDrawer,
		handlePrint,
	};
};
