import { useContext } from "react";
import { useCallback, useState } from "react";
import CrudContext from "@/contexts/crud/CrudContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import A20 from "@/modules/md-a20";
import { toast } from "react-toastify";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useDSG } from "../../shared-hooks/useDSG";
import { useInit } from "../../shared-hooks/useInit";

export const useA20 = ({ token }) => {
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A20",
	});
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const loader = useInfiniteLoader({
		url: "v1/prod/boms",
		bearer: token,
		initialFetchSize: 50,
		// debounce: 500,
	});

	//ProdComboGrid
	const materialsGrid = useDSG({
		gridId: "materials",
		keyColumn: "prod.ProdID",
	});

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

	const loadItem = useCallback(
		async (id) => {
			try {
				const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/prod/boms/${encodedId}`,
					bearer: token,
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A20.transformForReading(payload);
					materialsGrid.handleGridDataLoaded(data.materials);
					crud.doneReading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, materialsGrid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.ProdID });
			loadItem(rowData.ProdID);
		},
		[crud, loadItem]
	);

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/prod/boms",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`BOM「${data?.prod?.ProdID} ${data?.prod?.ProdData}」新增成功`
					);
					crud.doneCreating();
					crud.cancelReading();
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, loader, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();

				const { status, error } = await httpPutAsync({
					url: `v1/prod/boms`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`BOM「${data?.ProdID} ${data?.ProdData}」修改成功`
					);
					crud.doneUpdating();
					loadItem(data?.ProdID);
					// 重新整理
					loader.loadList({
						refresh: true,
					});
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, loadItem, loader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A20.onEditorSubmit()`, data);
			console.log(`materialsGrid.gridData`, materialsGrid.gridData);
			const processed = A20.transformForEditorSubmit(
				data,
				materialsGrid.gridData
			);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			materialsGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A20.onSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const promptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				materials: [],
			};
			crud.promptCreating({
				data,
			});
			materialsGrid.handleGridDataLoaded(data.materials);
		},
		[crud, materialsGrid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.prod?.ProdID} ${crud.itemData?.prod?.ProdData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/prod/boms/${crud.itemData?.prod.ProdID}`,
						bearer: token,
					});
					crud.cancelAction();
					if (status.success) {
						toast.success(
							`成功删除 ${crud.itemData?.prod?.ProdID} ${crud.itemData?.prod?.ProdData}`
						);
						loader.loadList({ refresh: true });
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
	}, [crud, dialogs, httpDeleteAsync, loader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			loader.loadList({
				params: data,
				// reset: true,
			});
		},
		[loader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleCreateRow = useCallback(
		() => ({
			prod: null,
		}),
		[]
	);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return rowData?.prod?.ProdID || rowIndex;
	}, []);

	const handleMaterialsGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const { prod } = rowData;
							const rowIndex = operation.fromRowIndex + i;
							const ogRowData = materialsGrid.gridData[rowIndex];
							const { prod: ogProd } = ogRowData;
							if (prod?.ProdID !== ogProd?.ProdID) {
								console.log(`prod[${rowIndex}] changed`, prod);

								newGridData[rowIndex] = {
									...rowData,
									["SPackData_N"]: prod?.PackData_N || "",
								};
							}
						});
				}
			}
			materialsGrid.setGridData(newGridData);
		},
		[materialsGrid]
	);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...loader,
		...crud,
		onSearchSubmit,
		onSearchSubmitError,
		handleSelect,
		selectedItem,
		handleDialogClose,
		confirmDialogClose,
		confirmQuitCreating,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		// CRUD overrides
		promptCreating,
		confirmDelete,
		// materialsGrid
		setMaterialsGridRef: materialsGrid.setGridRef,
		materialsGridData: materialsGrid.gridData,
		// handleMaterialsGridChange: materialsGrid.propagateGridChange,
		handleMaterialsGridChange,
		getRowKey,
		...appModule,
		handleCreateRow,
	};
};
