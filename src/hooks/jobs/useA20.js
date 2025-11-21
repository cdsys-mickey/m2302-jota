import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import A20 from "@/modules/md-a20";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useRef, useState } from "react";
import { useSideDrawer } from "../useSideDrawer";

export const useA20 = ({ token }) => {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A20",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const loader = useInfiniteLoader({
		url: "v1/prod/boms",
		bearer: token,
		initialFetchSize: 50,
		// debounce: 500,
	});

	const createRow = useCallback(
		() => ({
			sprod: null,
		}),
		[]
	);

	//ProdComboGrid
	const grid = useDSG({
		gridId: "prods",
		keyColumn: "sprod.ProdID",
		createRow,
	});

	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const itemId = refresh ? itemIdRef.current : id;
			if (!itemId) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
				crud.startReading("讀取中...", { id });
			}
			try {
				// const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/prod/boms`,
					bearer: token,
					params: {
						id: itemId,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A20.transformForReading(payload);
					grid.handleGridDataLoaded(data.materials);
					crud.finishedReading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failedReading(err);
			}
		},
		[crud, httpGetAsync, grid, token]
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

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
					toastEx.success(
						`BOM「${data?.ProdID} ${data?.ProdData}」新增成功`
					);
					crud.finishedCreating();
					crud.cancelReading();
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failedCreating(err);
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
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
					toastEx.success(
						`BOM「${data?.ProdID} ${data?.ProdData}」修改成功`
					);
					crud.finishedUpdating();
					loadItem({ id: data?.ProdID });
					// 重新整理
					loader.loadList({
						refresh: true,
					});
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failedUpdating(err);
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, loadItem, loader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A20.onEditorSubmit()`, data);
			console.log(`grid.gridData`, grid.gridData);
			const processed = A20.transformForEditorSubmit(data, grid.gridData);
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
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出",
			{
				position: "top-right",
			}
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
			grid.initGridData(data.materials, {
				fillRows: true,
			});
		},
		[crud, grid]
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
					if (status.success) {
						crud.cancelAction();
						toastEx.success(
							`成功删除 BOM ${crud.itemData?.prod?.ProdID} ${crud.itemData?.prod?.ProdData}`
						);
						loader.loadList({ refresh: true });
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
			["SProdQty"]: "",
		};
	}, []);

	const onUpdateRow = useCallback(
		({
				fromRowIndex,
				formData,
				newValue,
				setValue,
				gridMeta,
				updateResult,
			}) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// prod
				if (
					processedRowData.sprod?.ProdID != oldRowData.sprod?.ProdID
				) {
					console.log(
						`sprod[${rowIndex}] changed`,
						processedRowData?.sprod
					);
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
						formData,
					});

					if (
						rowData.sprod &&
						grid.isDuplicating(rowData, newValue)
					) {
						toastEx.error(
							`「${rowData.sprod?.ProdData}」已存在, 請選擇其他商品`,
							{
								position: "top-right",
							}
						);
						// setTimeout(() => {
						// 	gridMeta.setActiveCell({
						// 		col: 0,
						// 		row: rowIndex,
						// 	});
						// });
						processedRowData = {
							...processedRowData,
							["sprod"]: null,
							["SProdData"]: "",
							["SPackData_N"]: "",
						};
					}
				}
				return processedRowData;
			},
		[grid, handleGridProdChange]
	);

	// const buildGridChangeHandler = useCallback(
	// 	({ gridMeta }) =>
	// 		(newValue, operations) => {
	// 			const newGridData = [...newValue];
	// 			let checkFailed = false;
	// 			for (const operation of operations) {
	// 				if (operation.type === "UPDATE") {
	// 					console.log("dsg.UPDATE");
	// 					newValue
	// 						.slice(operation.fromRowIndex, operation.toRowIndex)
	// 						.forEach((rowData, i) => {
	// 							const rowIndex = operation.fromRowIndex + i;
	// 							const ogRowData = grid.gridData[rowIndex];
	// 							let processedRowData = { ...rowData };

	// 							if (rowData?.sprod?.ProdID !== ogRowData?.sprod?.ProdID) {
	// 								console.log(`prod[${rowIndex}] changed`, rowData?.sprod);

	// 								processedRowData = handleGridProdChange({
	// 									rowData: processedRowData,
	// 								});

	// 								if (
	// 									rowData.sprod &&
	// 									grid.isDuplicating(rowData, newValue)
	// 								) {
	// 									toastEx.error(
	// 										`「${rowData.sprod?.ProdData}」已存在, 請選擇其他商品`, {
	// 										position: "top-right"
	// 									}
	// 									);
	// 									setTimeout(() => {
	// 										gridMeta.setActiveCell({
	// 											col: 0,
	// 											row: rowIndex,
	// 										});
	// 									});
	// 									checkFailed = true;
	// 								}
	// 							}
	// 							newGridData[rowIndex] = processedRowData;
	// 						});
	// 				} else if (operation.type === "CREATE") {
	// 					console.log("dsg.CREATE");
	// 					// process CREATE here
	// 					gridMeta.toFirstColumn({ nextRow: true });
	// 				}
	// 			}
	// 			if (!checkFailed) {
	// 				grid.setGridData(newGridData);
	// 			}
	// 		},
	// 	[grid, handleGridProdChange]
	// );

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
		grid,
		...grid,
		// buildGridChangeHandler,
		getRowKey,
		...appModule,
		createRow,
		onUpdateRow,
		...sideDrawer,
	};
};
