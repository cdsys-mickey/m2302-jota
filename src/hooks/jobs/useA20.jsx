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
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInit } from "@/shared-hooks/useInit";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useSideDrawer } from "../useSideDrawer";

export const useA20 = ({ token }) => {
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A20",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

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
	const grid = useDSG({
		gridId: "prods",
		keyColumn: "sprod.ProdID",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"sprod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "sprod",
						withBomPackageName: true,
						selectOnFocus: true,
						triggerDelay: 300,
						placeholder: "組合商品",
						typeToSearchText: "請輸入商品編號或名稱進行搜尋",
						queryRequired: true,
						filterByServer: true,
						disableOpenOnInput: true,
						hideControlsOnActive: true,
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
				minWidth: 170,
				maxWidth: 170,
				disabled: !crud.editing,
			},
			{
				...keyColumn(
					"SProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "商品名稱",
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
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SProdQty", createFloatColumn(2)),
				title: "標準用量",
				minWidth: 90,
				maxWidth: 90,
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
	});

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		prod,
		ProdQty
		`,
		{
			lastField: handleLastField
		}
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

	const loadItem = useCallback(
		async ({ id }) => {
			try {
				const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/prod/boms/${encodedId}`,
					bearer: token,
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A20.transformForReading(payload);
					grid.handleGridDataLoaded(data.materials);
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
		[crud, httpGetAsync, grid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.ProdID });
			loadItem({ id: rowData.ProdID });
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
						`BOM「${data?.ProdID} ${data?.ProdData}」新增成功`
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
					loadItem({ id: data?.ProdID });
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
			console.log(`grid.gridData`, grid.gridData);
			const processed = A20.transformForEditorSubmit(
				data,
				grid.gridData
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
			grid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A20.onSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const createRow = useCallback(
		() => ({
			sprod: null,
		}),
		[]
	);

	const promptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				materials: grid.fillRows({ createRow }),
			};
			crud.promptCreating({
				data,
			});
			grid.handleGridDataLoaded(data.materials);
		},
		[createRow, crud, grid]
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
							`成功删除 BOM ${crud.itemData?.prod?.ProdID} ${crud.itemData?.prod?.ProdData}`
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

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return rowData?.prod?.ProdID || rowIndex;
	}, []);

	const handleGridProdChange = useCallback(({ rowData }) => {
		const { sprod } = rowData;
		return {
			...rowData,
			["SProdData"]: sprod?.ProdData || "",
			["SPackData_N"]: sprod?.PackData_N || "",
			["SProdQty"]: ""
		};
	}, []);


	const handleGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					console.log("dsg.UPDATE");
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const ogRowData = grid.gridData[rowIndex];
							let processedRowData = { ...rowData };

							if (rowData?.sprod?.ProdID !== ogRowData?.sprod?.ProdID) {
								console.log(`prod[${rowIndex}] changed`, rowData?.sprod);

								processedRowData = handleGridProdChange({
									rowData: processedRowData,
								});

								if (
									rowData.sprod &&
									grid.isDuplicating(rowData, newValue)
								) {
									toast.error(
										`「${rowData.sprod?.ProdData}」已存在, 請選擇其他商品`,
										{ position: "top-center" }
									);
									setTimeout(() => {
										gridMeta.setActiveCell({
											col: 0,
											row: rowIndex,
										});
									});
									checkFailed = true;
								}
							}
							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					gridMeta.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				grid.setGridData(newGridData);
			}
		},
		[grid, gridMeta, handleGridProdChange]
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
		// grid
		setGridRef: grid.setGridRef,
		gridData: grid.gridData,
		handleGridChange,
		getRowKey,
		...appModule,
		createRow,
		formMeta,
		grid,
		gridMeta,
		...sideDrawer
	};
};
