import { useContext } from "react";
import { useCallback, useState } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useAppModule } from "./useAppModule";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useRef } from "react";
import B05 from "@/modules/md-b05";
import Errors from "@/shared-modules/sd-errors";
import { toast } from "react-toastify";
import Objects from "@/shared-modules/sd-objects";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { nanoid } from "nanoid";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useSideDrawer } from "../useSideDrawer";

export const useB05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
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
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/prod/inquiries",
		bearer: token,
		initialFetchSize: 50,
	});

	const grid = useDSG({
		gridId: "quotes",
		keyColumn: "pkey",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						selectOnFocus: true,
						triggerDelay: 300,
						queryRequired: true,
						filterByServer: true,
						disableOpenOnInput: true,
						hideControlsOnActive: false,
						forId: true,
						disableClearable: true,
						fuzzy: true,
						autoHighlight: true,
						componentsProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "商品編號",
				minWidth: 180,
				maxWidth: 180,
				disabled: !crud.editing,
			},
			{
				...keyColumn(
					"SProdData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"SPackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝說明",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "廠商報價",
				minWidth: 120,
				maxWidth: 120,
				disabled: !crud.editing,
			},
		],
		[crud.editing]
	);

	const gridMeta = useDSGMeta({
		data: grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SPrice: "",
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
		grid.initGridData(data.quotes, { createRow });
	}, [createRow, crud, grid]);

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
				toast.error(Errors.getMessage("新增失敗", err));
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
					crud.doneReading({
						data: data,
					});
					setSelectedInq(data);

					grid.handleGridDataLoaded(data.quotes);
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
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除詢價單 ${itemData?.InqID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err));
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
				["SPrice"]: "",
				["SPackData_N"]: rowData?.prod?.PackData_N || "",
				["SProdData_N"]: rowData?.prod?.ProdData || ""
			};
			return processedRowData;
		},
		[]
	);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log("handleGridChange", operations);
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
		[grid, handleGridProdChange, gridMeta]
	);

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
						...B05.transformAsQueryParams(criteria),
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
				toast.error(Errors.getMessage("篩選失敗", err));
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
						...B05.transformAsQueryParams(ipState.criteria),
						sk: ipState.saveKey,
					},
				});
				if (status.success) {
					const data = payload.data?.[0].FactInq_S || [];
					console.log("data", data);
					grid.initGridData(B05.transformForGridImport(data), {
						createRow,
					});
					toast.success(`成功帶入 ${data.length} 筆商品`);
					importProdsAction.clear();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				importProdsAction.fail(err);
				toast.error(Errors.getMessage("帶入商品發生錯誤", err));
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
				JobName: "B05",
				IDs: crud.itemData?.InqID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebB05Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.InqID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

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
		...gridMeta,
		grid,
		gridMeta,
		handleGridChange,
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
		handleLastField,
		loadProdFormMeta,
		...sideDrawer
	};
};
