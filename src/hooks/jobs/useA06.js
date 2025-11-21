/* eslint-disable no-mixed-spaces-and-tabs */
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import A06 from "@/modules/md-a06";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useMemo, useState } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useSideDrawer } from "../useSideDrawer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useRef } from "react";

export const useA06 = ({ token, mode }) => {
	const itemIdRef = useRef();
	const formMeta = useFormMeta(
		`
		CustID,
		CustData,
		AbbrName,
		employee,
		TaxType,
		level,
		area,
		channel,
		RecGroup,
		payment,
		bank,
		BankAcct,
		Boss,
		Contact,
		UniForm,
		CompTel,
		CompFax,
		Cel,
		RecAddr,
		RecTel,
		InvAddr,
		InvTel,
		transport,
		mainProd,
		remark
	`
	);
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: mode === A06.Mode.NEW_CUSTOMER ? "A07" : "A06",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { clearParams } = useContext(AppFrameContext);

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApiAsync();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const loader = useInfiniteLoader({
		url:
			mode === A06.Mode.NEW_CUSTOMER
				? "v1/sales/new-customers"
				: "v1/sales/customers",
		bearer: token,
		initialFetchSize: 50,
		params: {
			acc: 1,
		},
	});

	if (!mode) {
		throw `mode 未指定`;
	}

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
				// const encodedItemId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url:
						mode === A06.Mode.NEW_CUSTOMER
							? `v1/sales/new-customers`
							: `v1/sales/customers`,
					bearer: token,
					params: {
						id: itemId,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A06.transformForReading(payload.data[0]);

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
		[crud, httpGetAsync, mode, token]
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

			crud.startReading("讀取中...", { id: rowData.CustID });
			loadItem({ id: rowData.CustID });
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
					url:
						mode === A06.Mode.NEW_CUSTOMER
							? "v1/sales/new-customers"
							: "v1/sales/customers",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`${mode === A06.Mode.NEW_CUSTOMER ? "新" : ""}客戶「${
							data?.CustData
						}」新增成功`
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
		[crud, httpPostAsync, loader, mode, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url:
						mode === A06.Mode.NEW_CUSTOMER
							? `v1/sales/new-customers`
							: `v1/sales/customers`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`${mode === A06.Mode.NEW_CUSTOMER ? "新" : ""}客戶「${
							data?.CustData
						}」修改成功`
					);
					crud.finishedUpdating();
					// crud.cancelReading();
					loadItem({ id: data?.CustID });
					// 重新整理
					loader.loadList({ refresh: true });
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failedUpdating(err);
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, loadItem, loader, mode, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A06.onEditorSubmit()`, data);
			const processed = A06.transformForEditorSubmit(data);
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
		console.error(`A06.onSubmitError`, err);
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
			message: `確認要删除客戶「${crud.itemData?.CustData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url:
							mode === A06.Mode.NEW_CUSTOMER
								? `v1/sales/new-customers`
								: `v1/sales/customers`,
						bearer: token,
						params: {
							id: crud.itemData?.CustID,
						},
					});
					if (status.success) {
						crud.cancelAction();
						toastEx.success(
							`成功删除${
								mode === A06.Mode.NEW_CUSTOMER ? "新" : ""
							}商品${crud.itemData.CustData}`
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
	}, [crud, dialogs, httpDeleteAsync, loader, mode, token]);

	// REVIEW
	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async ({ value }) => {
			console.log(`handleReview`, value);
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/sales/new-customers/reviewed`,
					data: {
						...crud.itemData,
						OfficialCustID: value,
					},
					bearer: token,
				});
				if (status.success) {
					reviewAction.clear();
					crud.cancelAction();
					loader.loadList({
						refresh: true,
					});
					toastEx.success(
						`「${crud.itemData?.CustData}」已轉為正式客戶`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toastEx.error("轉換失敗", err);
			}
		},
		[crud, httpPatchAsync, loader, reviewAction, token]
	);

	const promptReview = useCallback(() => {
		dialogs.prompt({
			title: "轉正式客戶",
			label: "正式客戶編號",
			message: "請輸入正式客戶編號",
			onConfirm: handleReview,
			value: crud.itemData?.CustID || "",
			confirmText: "執行轉換",
		});
		reviewAction.prompt();
	}, [crud.itemData?.CustID, dialogs, handleReview, reviewAction]);

	const cancelReview = useCallback(() => {
		reviewAction.cancel();
	}, [reviewAction]);

	const startReview = useCallback(() => {
		reviewAction.start();
	}, [reviewAction]);

	const finishReview = useCallback(() => {
		reviewAction.finish();
	}, [reviewAction]);

	const failReview = useCallback(() => {
		reviewAction.fail();
	}, [reviewAction]);

	const onSearchSubmit = useCallback(
		(payload) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, payload);
			loader.loadList({
				params: A06.transformAsQueryParams(payload),
			});
		},
		[handlePopperClose, loader]
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
					lvEmployee: null,
					lvArea: null,
					lvPaymentType: null,
					lvBank: null,
				});
			},
		[]
	);

	const cancelAction = useCallback(() => {
		crud.cancelAction();
		// 清除 query params
		clearParams();
	}, [clearParams, crud]);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...loader,
		// Popper
		popperOpen: popperOpen,
		handlePopperToggle: handlePopperToggle,
		handlePopperOpen: handlePopperOpen,
		handlePopperClose: handlePopperClose,
		onSearchSubmit,
		onSearchSubmitError,
		mode,
		handleSelect,
		selectedItem,
		...crud,
		handleDialogClose,
		confirmDialogClose,
		confirmQuitCreating,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		// CRUD OVERRIDES
		handlePromptCreating,
		confirmDelete,
		// REVIEW
		reviewing,
		promptReview,
		cancelReview,
		startReview,
		finishReview,
		failReview,
		...appModule,
		formMeta,
		handleReset,
		cancelAction: cancelAction,
		...sideDrawer,
	};
};
