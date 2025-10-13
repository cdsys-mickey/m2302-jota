import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useState } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import G08 from "./G08.mjs";
import ConfigContext from "@/contexts/config/ConfigContext";
import useJotaReports from "@/hooks/useJotaReports";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useMemo } from "react";
import { useRef } from "react";

export const useG08 = () => {
	const itemIdRef = useRef();
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const formMeta = useFormMeta(
		`
		AdjID,
		AdjDate,
		CustID,
		AdjAmt,
		RsnData
		`
	);
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "G08",
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
		url: "v1/sales/recv-account/adj-entries",
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
					url: `v1/sales/recv-account/adj-entries`,
					bearer: token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = G08.transformForReading(payload.data[0]);

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
		[crud, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.startReading("讀取中...", { id: rowData.AdjID });
			loadItem({ id: rowData.AdjID });
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

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/sales/recv-account/adj-entries",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(`調整單「${data?.AdjID}」新增成功`);
					crud.finishedCreating();
					crud.cancelReading();
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.failedCreating(err);
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
					url: `v1/sales/recv-account/adj-entries`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(`調整單「${data?.AdjID}」修改成功`);
					crud.finishedUpdating();
					loadItem({ id: data?.AdjID });
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failedUpdating(err);
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, loadItem, listLoader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`G08.onEditorSubmit()`, data);

			const processed = G08.transformForEditorSubmit(data);
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
		console.error(`G08.onSubmitError`, err);
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
				AdjDate: new Date(),
			};
			crud.promptCreating({
				data,
			});
		},
		[crud]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除「${crud.itemData?.AdjID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/recv-account/adj-entries`,
						bearer: token,
						params: {
							id: crud.itemData?.AdjID,
						},
					});
					if (status.success) {
						crud.cancelAction();
						toastEx.success(`成功删除 ${crud.itemData?.AdjID}`);
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
				params: G08.transformAsQueryParams(data),
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

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebG08Rep.aspx`;
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
				JobName: "G08",
				IDs: crud.itemData?.AdjID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.AdjID, operator?.CurDeptID, reportUrl, reports]
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
		handleReset,
		onPrintSubmit,
		onPrintSubmitError,
		handlePrint,
	};
};
