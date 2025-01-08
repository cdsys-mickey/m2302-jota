import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAppModule } from "./useAppModule";
import CrudContext from "@/contexts/crud/CrudContext";
import A05 from "@/modules/md-a05";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useInit } from "@/shared-hooks/useInit";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import { useSideDrawer } from "../useSideDrawer";
import { useToggle } from "@/shared-hooks/useToggle";
import { toastEx } from "@/helpers/toast-ex";

export const useA05 = ({ token }) => {
	const formMeta = useFormMeta(
		`
		FactID,
		FactData,
		AbbrName,
		Boss,
		Contact,
		Tel,
		Uniform,
		bank,
		PayGroup,
		BankAcct,
		CompAddr,
		CompTel,
		CompFax,
		TaxType,
		FactAddr,
		FactTel,
		FactFax,
		mainProd,
		remark
		`
	);
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A05",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/suppliers",
		bearer: token,
		initialFetchSize: 50,
		params: {
			acc: 1
		}
	});

	const loadItem = useCallback(
		async ({ id }) => {
			try {
				const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/purchase/suppliers`,
					bearer: token,
					params: {
						id: encodedId,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A05.transformForReading(payload.data[0]);

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
		[crud, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.FactID });
			loadItem({ id: rowData.FactID });
		},
		[crud, loadItem]
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

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
					url: "v1/purchase/suppliers",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`廠商商品「${data?.FactID} ${data?.FactData}」新增成功`
					);
					crud.doneCreating();
					crud.cancelReading();
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
			}
		},
		[crud, httpPostAsync, listLoader, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				// const oldId = crud.itemData?.ProdID;
				const { status, error } = await httpPutAsync({
					url: `v1/purchase/suppliers`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`商品「${data?.FactID} ${data?.FactData}」修改成功`
					);
					crud.doneUpdating();
					loadItem({ id: data?.FactID });
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, loadItem, listLoader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A05.onEditorSubmit()`, data);

			const processed = A05.transformForEditorSubmit(data);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.creating, crud.updating, handleCreate, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A05.onSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
			, {
				position: "top-right"
			});
	}, []);

	const promptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				trans: [],
				combo: [],
			};
			crud.promptCreating({
				data,
			});
		},
		[crud]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.FactID} ${crud.itemData?.FactData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/suppliers`,
						bearer: token,
						params: {
							id: crud.itemData?.FactID
						}
					});
					crud.cancelAction();
					if (status.success) {
						toastEx.success(
							`成功删除${crud.itemData?.FactID} ${crud.itemData.FactData}`
						);
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
	}, [crud, dialogs, httpDeleteAsync, listLoader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			listLoader.loadList({
				params: A05.transformAsQueryParams(data),
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
					lvBank: null
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
		promptCreating,
		confirmDelete,
		...appModule,
		formMeta,
		...sideDrawer,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset
	};
};
