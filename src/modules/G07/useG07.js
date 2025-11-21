import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import G07 from "@/modules/G07/G07";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import useAction from "@/shared-modules/ActionState/useAction";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useState } from "react";

export const useG07 = () => {
	const crud = useContext(CrudContext);

	const [selectedTab, setSelectedTab] = useState(G07.Tabs.CARRY);
	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	const dialogs = useContext(DialogsContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G07",
	});

	const { httpPostAsync } = useWebApiAsync();
	const formMeta = useFormMeta(
		`
		session,
		CustID,
		AccYM,
		Stage,
		`
	);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = {
				...G07.transformForSubmitting(payload),
			};
			console.log("data", data);
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/sales/recv-account/carry-forward",
					bearer: token,
					mode: "form",
					data,
				});
				if (status.success) {
					toastEx.success("結轉已成功");
					crud.finishedUpdating();
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedUpdating(err);
				console.error(err);
				toastEx.error("結轉失敗", err);
			} finally {
				crud.finishedUpdating();
			}
			// dialogs.confirm({
			// 	message: "確定進行結轉?",
			// 	onConfirm: async () => {
			// 		try {
			// 			crud.startUpdating();
			// 			const { status, error } = await httpPostAsync({
			// 				url: "v1/sales/recv-account/carry-forward",
			// 				bearer: token
			// 			})
			// 			if (status.success) {
			// 				toastEx.success("結轉已成功");
			// 				crud.finishedUpdating();
			// 			} else {
			// 				throw error ?? new Error("未預期例外");
			// 			}
			// 		} catch (err) {
			// 			crud.failedUpdating(err);
			// 			console.error(err);
			// 			toastEx.error("結轉失敗", err);
			// 		} finally {
			// 			crud.finishedUpdating();
			// 		}
			// 	},
			// })
		},
		[crud, httpPostAsync, token]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const restoreAction = useAction();
	const onRestoreSubmit = useCallback(
		async (payload) => {
			console.log("onRestoreSubmit", payload);

			dialogs.confirm({
				message: "確定還原應收帳結轉?",
				onConfirm: async () => {
					const data = G07.transformForRestoreSubmitting(payload);
					restoreAction.start();
					try {
						const { status, error } = await httpPostAsync({
							url: "v1/sales/recv-account/restore",
							bearer: token,
							mode: "form",
							data,
						});
						if (status.success) {
							restoreAction.finish();
							toastEx.success("復原已成功");
						} else {
							throw error ?? new Error("未預期例外");
						}
					} catch (err) {
						console.error(err);
						restoreAction.fail(err);
						toastEx.error("復原失敗", err);
					}
				},
			});
		},
		[dialogs, httpPostAsync, restoreAction, token]
	);

	const onRestoreSubmitError = useCallback((err) => {
		console.error("onRestoreSubmitError", err);
	}, []);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		formMeta,
		handleTabChange,
		// 復原
		onRestoreSubmit,
		onRestoreSubmitError,
		restoreWorking: restoreAction.working,
		selectedTab,
	};
};
