import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useState } from "react";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import P34 from "./P34.mjs";
import { useRef } from "react";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { nanoid } from "nanoid";
import { useMemo } from "react";

export const useP34 = ({ token }) => {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "P34",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	// GRID
	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			MFixP: true,
		}),
		[]
	);

	const grid = useDSG({
		gridId: "ranges",
		keyColumn: "id",
		skipDisabled: true,
		createRow: createRow,
	});
	const gridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const listLoader = useInfiniteLoader({
		url: "v1/cms/bus-comps",
		bearer: token,
		initialFetchSize: 50,
		params: {
			acc: 1,
		},
	});

	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const _id = refresh ? itemIdRef.current : id;
			if (!_id) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
				crud.startReading("讀取中...", { id });
			}
			try {
				// const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/bus-comps`,
					bearer: token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = P34.transformForReading(payload.data[0]);
					grid.initGridData(data.ranges, {
						fillRows: 3,
					});
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
		[crud, grid, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.CarID });
			loadItem({ id: rowData.CarID });
		},
		[crud, loadItem]
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

	const handleSave = useCallback(
		async ({ data, creating }) => {
			const action = creating ? "新增" : "修改";
			try {
				crud.creating ? crud.startCreating() : crud.startUpdating();
				const httpMethod = creating ? httpPostAsync : httpPutAsync;
				const { status, error } = await httpMethod({
					url: "v1/cms/bus-comps",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`車行「${data?.CarID} ${data?.CarData}」${action}成功`
					);
					if (creating) {
						crud.finishedCreating();
						crud.cancelReading();
					} else {
						crud.finishedUpdating();
						loadItem({ id: data?.CarID });
					}
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error(`發生未預期例外`);
				}
			} catch (err) {
				if (creating) {
					crud.failedCreating(err);
					console.error("handleCreate.failed", err);
				} else {
					crud.failedUpdating(err);
					console.error("handleUpdate.failed", err);
				}
				toastEx.error(`${action}失敗`, err);
			}
		},
		[crud, httpPostAsync, httpPutAsync, listLoader, loadItem, token]
	);

	// const handleCreate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startCreating();
	// 			const { status, error } = await httpPostAsync({
	// 				url: "v1/cms/bus-comps",
	// 				data: data,
	// 				bearer: token,
	// 			});

	// 			if (status.success) {
	// 				toastEx.success(
	// 					`佣金「${data?.CarID} ${data?.CarData}」新增成功`
	// 				);
	// 				crud.finishedCreating();
	// 				crud.cancelReading();
	// 				// 重新整理
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error("新增發生未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedCreating(err);
	// 			console.error("handleCreate.failed", err);
	// 			toastEx.error("新增失敗", err);
	// 		}
	// 	},
	// 	[crud, httpPostAsync, listLoader, token]
	// );

	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			// const oldId = crud.itemData?.ProdID;
	// 			const { status, error } = await httpPutAsync({
	// 				url: `v1/cms/bus-comps`,
	// 				data: data,
	// 				bearer: token,
	// 			});

	// 			if (status.success) {
	// 				toastEx.success(
	// 					`廠商「${data?.CarID} ${data?.CarData}」修改成功`
	// 				);
	// 				crud.finishedUpdating();
	// 				loadItem({ id: data?.CarID });
	// 				// 重新整理
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error("修改發生未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedUpdating(err);
	// 			console.error("handleUpdate.failed", err);
	// 			toastEx.error("修改失敗", err);
	// 		}
	// 	},
	// 	[crud, httpPutAsync, loadItem, listLoader, token]
	// );

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`P34.onEditorSubmit()`, data);

			const processed = P34.transformForEditorSubmit(data, grid.gridData);
			console.log(`processed`, processed);

			if (crud.creating || crud.updating) {
				handleSave({ data: processed, creating: crud.creating });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, grid.gridData, handleSave]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`P34.onSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出",
			{
				position: "top-right",
			}
		);
	}, []);

	const handlePromptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				ranges: [],
			};
			crud.promptCreating({
				data,
			});
			grid.initGridData(data.ranges, { fillRows: 3 });
		},
		[crud, grid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.CarID} ${crud.itemData?.CarData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/cms/bus-comps`,
						bearer: token,
						params: {
							id: crud.itemData?.CarID,
						},
					});
					if (status.success) {
						crud.cancelAction();
						toastEx.success(
							`成功删除${crud.itemData?.CarID} ${crud.itemData.CarData}`
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
	}, [crud, dialogs, httpDeleteAsync, listLoader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			listLoader.loadList({
				params: P34.transformAsQueryParams(data),
				// reset: true,
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				reset({
					lvId: "",
					lvName: "",
					lvBank: null,
				});
			},
		[]
	);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...listLoader,
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
		handlePromptCreating,
		confirmDelete,
		...appModule,
		...sideDrawer,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset,
		// GRID
		grid,
		gridDisabled,
		createRow,
	};
};
