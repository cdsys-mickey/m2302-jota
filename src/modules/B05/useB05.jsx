import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Objects from "@/shared-modules/Objects.mjs";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { useAppModule } from "@/hooks/jobs/useAppModule";
import useJotaReports from "@/hooks/useJotaReports";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import B05 from "./B05.mjs";

export const useB05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "B05",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/prod/inquiries",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SPrice: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "pkey",
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
			fillRows: 15
		});
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/prod/inquiries",
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
		async ({ id, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : id;
				if (!refresh) {
					itemIdRef.current = id;
					crud.startReading("讀取中...", { id });
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/prod/inquiries",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = B05.transformForReading(payload.data[0]);
					crud.finishedReading({
						data: data,
					});
					setSelectedInq(data);

					grid.handleGridDataLoaded(data.quotes);
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
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.詢價單號 });
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
					url: "v1/prod/inquiries",
					data: data,
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
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除詢價單「${itemData?.InqID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/prod/inquiries`,
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

	const handleGridProdChange = useCallback(
		({ rowData }) => {
			let processedRowData = { ...rowData };
			processedRowData = {
				...processedRowData,
				["SProdData_N"]: rowData?.prod?.ProdData || "",
				["SPackData_N"]: rowData?.prod?.PackData_N || "",
				["SPrice"]: "",
			};
			return processedRowData;
		},
		[]
	);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// prod
		if (processedRowData.prod?.ProdID != oldRowData.prod?.ProdID) {
			console.log(
				`prod[${rowIndex}] changed`,
				processedRowData?.prod
			);
			processedRowData = await handleGridProdChange({
				rowData: processedRowData,
				formData
			});
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	// const buildGridChangeHandler = useCallback(
	// 	({ gridMeta }) => (newValue, operations) => {
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
			const collected = B05.transformForSubmitting(
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
		[
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			grid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
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
					url: "v1/prod/data-grid/B05",
					bearer: token,
					params: {
						...B05.transformImportProdsAsQueryParams(criteria),
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
		async (data) => {
			console.log("onImportProdsSubmit", data);
			try {
				importProdsAction.start();
				const { status, payload, error } = await httpGetAsync({
					url: "v1/prod/data-grid/B05",
					bearer: token,
					params: {
						...B05.transformImportProdsAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].FactInq_S || [];
					console.log("data", data);
					grid.initGridData(B05.transformForGridImport(data), {
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
		return `${config.REPORT_URL}/WebB05Rep.aspx`
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
				JobName: "B05",
				IDs: crud.itemData?.InqID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.InqID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback((outputType) => {
		console.log("handlePrint", outputType);
		const data = {
			...(outputType && {
				Action: outputType.id,
			}),
			DeptID: operator?.CurDeptID,
			JobName: "B05",
			IDs: crud.itemData?.InqID,
		};
		console.log("data", data);
		reports.open(reportUrl, data);
	}, [crud.itemData?.InqID, operator?.CurDeptID, reportUrl, reports]);



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

	return {
		...crud,
		...listLoader,
		...appModule,
		selectedInq,
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
		...grid,
		grid,
		// buildGridChangeHandler,
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
		onUpdateRow,
		createRow,
		handlePrint
	};
};
