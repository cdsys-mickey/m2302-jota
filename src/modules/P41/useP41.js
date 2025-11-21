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
import P41 from "./P41.mjs";
import { useRef } from "react";
import useAppRedirect from "@/hooks/useAppRedirect";
import CmsGroupTypeContext from "@/components/CmsGroupTypePicker/CmsGroupTypeContext";

export const useP41 = ({ token }) => {
	const itemIdRef = useRef();
	const tsRef = useRef();
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "P41",
	});
	const { toModule } = useAppRedirect();

	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const listLoader = useInfiniteLoader({
		url: "v1/cms/bookings",
		bearer: token,
		initialFetchSize: 50,
		params: {
			acc: 1,
		},
	});

	const { groupTypeAlias } = useContext(CmsGroupTypeContext);

	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const _id = refresh ? itemIdRef.current : id;
			try {
				if (!_id) {
					throw new Error("未指定 id");
				}
				if (!refresh) {
					itemIdRef.current = id;
					crud.startReading("讀取中...", { id });
				}
				// const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/bookings`,
					bearer: token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					tsRef.current = payload.CheckData.TimeVal;
					const data = P41.transformForReading(
						payload.data[0],
						groupTypeAlias
					);

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
		[crud, groupTypeAlias, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.OrdID });
			loadItem({ id: rowData.OrdID });
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
				creating ? crud.startCreating() : crud.startUpdating();
				const httpMethod = creating ? httpPostAsync : httpPutAsync;
				const { status, error, payload } = await httpMethod({
					url: "v1/cms/bookings",
					data: data,
					bearer: token,
				});

				if (status.success) {
					const data = payload.data?.[0];
					toastEx.success(`團體預約單 ${data?.OrdID} ${action}成功`);
					if (creating) {
						crud.finishedCreating();
						crud.cancelReading();
					} else {
						crud.finishedUpdating();
						loadItem({ id: data?.OrdID });
					}
					// 重新整理
					listLoader.loadList({ refresh: true });
					tsRef.current = payload.CheckData.TimeVal;
				} else {
					throw error || new Error(`${action}增發生未預期例外`);
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

	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			// const oldId = crud.itemData?.ProdID;
	// 			const { status, error } = await httpPutAsync({
	// 				url: `v1/cms/bookings`,
	// 				data: data,
	// 				bearer: token,
	// 			});

	// 			if (status.success) {
	// 				toastEx.success(
	// 					`團體預約單「${data?.OrdID}」修改成功`
	// 				);
	// 				crud.finishedUpdating();
	// 				loadItem({ id: data?.OrdID });
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
			console.log(`P41.onEditorSubmit()`, data);

			const processed = P41.transformForEditorSubmit(data);
			console.log(`processed`, processed);
			if (crud.creating || crud.updating) {
				handleSave({ data: processed, creating: crud.creating });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, handleSave]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`P41.onSubmitError`, err);
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
				OrdDate: new Date(),
				ArrDate: new Date(),
			};
			crud.promptCreating({
				data,
			});
		},
		[crud]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除預約單 ${crud.itemData?.OrdID}?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/cms/bookings`,
						bearer: token,
						params: {
							id: crud.itemData?.OrdID,
							ts: tsRef.current,
						},
					});
					if (status.success) {
						crud.cancelAction();
						toastEx.success(
							`成功删除預約單 ${crud.itemData?.OrdID}`
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
				params: P41.transformAsQueryParams(data),
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

	const gotoP42 = useCallback(() => {
		toModule("P42", { target: crud.itemData?.OrdID });
	}, [crud.itemData?.OrdID, toModule]);

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
		gotoP42,
	};
};
