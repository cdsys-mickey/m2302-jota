import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import REB from "@/modules/REB/REB";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import useAction from "@/shared-modules/ActionState/useAction";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useState } from "react";
import F07 from "../md-f07";

export const useREB = () => {
	const crud = useContext(CrudContext);
	const {
		httpGetAsync,
		httpPostAsync
	} = useWebApi();
	const [selectedTab, setSelectedTab] = useState(REB.TabType.SALES_DATA);
	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	const dialogs = useContext(DialogsContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "REB",
	});


	const formMeta = useFormMeta(
		`
		dept,
		beginDate,
		endDate,
		`
	)

	const onSubmit = useCallback(
		async (payload) => {

			// try {
			// 	crud.startUpdating();
			// 	const { status, error } = await httpPostAsync({
			// 		url: "v1/sales/data/rebuild",
			// 		bearer: token,
			// 		mode: "form",
			// 		data
			// 	})
			// 	if (status.success) {
			// 		toastEx.success("重整已成功");
			// 		crud.finishedUpdating();
			// 	} else {
			// 		throw error ?? new Error("未預期例外");
			// 	}
			// } catch (err) {
			// 	crud.failedUpdating(err);
			// 	console.error(err);
			// 	toastEx.error("重整失敗", err);
			// } finally {
			// 	crud.finishedUpdating();
			// }
			console.log("onSubmit", payload);
			const data = REB.transformForSubmitting(payload);
			console.log("data", data);
			dialogs.confirm({
				message: "確定進行銷售累積檔重整?",
				onConfirm: async () => {
					try {
						crud.startUpdating();
						const { status, error, payload } = await httpPostAsync({
							url: "v1/sales/data/rebuild",
							bearer: token,
							data
						})
						if (status.success) {
							toastEx.success(payload?.message || "重整已成功");
							crud.finishedUpdating();
						} else {
							throw error ?? new Error(payload?.message || "發生未預期例外");
						}
					} catch (err) {
						crud.failedUpdating(err);
						console.error(err);
						toastEx.error("重整失敗", err);
					} finally {
						crud.finishedUpdating();
					}
				},
			})

		},
		[crud, dialogs, httpPostAsync, token]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const posRebuildAction = useAction();
	const onPosRebuildSubmit = useCallback(
		async (payload) => {
			console.log("onPosRebuildSubmit", payload);
			const data = REB.transformForPosRebuildSubmitting(payload);
			console.log("data", data);
			dialogs.confirm({
				message: "確定重整POS累計檔?",
				onConfirm: async () => {

					posRebuildAction.start();
					try {
						const { status, error, payload } = await httpPostAsync({
							url: "v1/pos/data/rebuild",
							bearer: token,
							data
						})
						if (status.success) {
							posRebuildAction.finish();
							toastEx.success(payload?.message || "POS累計檔重整已成功");
						} else {
							throw error ?? new Error(payload?.message || "發生未預期例外");
						}
					} catch (err) {
						console.error(err);
						posRebuildAction.fail(err);
						toastEx.error("重整失敗", err);
					}

				},
			})
		},
		[dialogs, httpPostAsync, posRebuildAction, token]
	);

	const onPosRebuildSubmitError = useCallback((err) => {
		console.error("onPosRebuildSubmitError", err);
	}, [])

	const load = useCallback(
		async ({ refresh = false, id } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/sales/data/prev-inv",
					bearer: token,
					...(id && {
						params: {
							d: id
						}
					})
				});
				if (status.success) {
					const data = F07.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.finishedLoading({
						data: data,
					});
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedLoading(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	return {
		...appModule,
		...crud,
		onSubmit,
		onSubmitError,
		formMeta,
		handleTabChange,
		// 復原
		onPosRebuildSubmit,
		onPosRebuildSubmitError,
		posRebuildWorking: posRebuildAction.working,
		selectedTab,
		load
	};
};






