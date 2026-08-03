import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import REB from "@/modules/REB/REB.mjs";
import { FormMetaProvider, toastEx } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useWebApiAsync } from "@/shared-hooks";
import { createContext, useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { RebPosContext } from "./RebPosContext";

export const RebPosProvider = ({ children, ...rest }) => {
	const { token, operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: operator ? {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			} : null,
			beginDate: null,
			endDate: null
		},
	});
	const crud = useContext(CrudContext);
	const { httpGetAsync, httpPostAsync } = useWebApiAsync();

	const dialogs = useContext(DialogsContext);

	const formMeta = useFormMeta(
		`
		dept,
		beginDate,
		endDate,
		`,
	);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = REB.transformForPosRebuildSubmitting(payload);
			console.log("data", data);
			dialogs.confirm({
				message: "確定重整POS累計檔?",
				onConfirm: async () => {
					crud.startUpdating();
					try {
						const { status, error, payload } = await httpPostAsync({
							url: "v1/pos/data/rebuild",
							bearer: token,
							data,
						});
						if (status.success) {
							crud.finishedUpdating();
							toastEx.success(
								payload?.message || "POS累計檔重整已成功"
							);
						} else {
							throw (
								error ??
								new Error(payload?.message || "發生未預期例外")
							);
						}
					} catch (err) {
						console.error(err);
						crud.failedUpdating(err);
						toastEx.error("重整失敗", err);
					}
				},
			});
		},
		[crud, dialogs, httpPostAsync, token]
	);


	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出",
		);
	}, []);

	// const load = useCallback(
	// 	async ({ refresh = false, id } = {}) => {
	// 		try {
	// 			if (!refresh) {
	// 				crud.startLoading("讀取中...");
	// 			}
	// 			const { status, payload, error } = await httpGetAsync({
	// 				url: "v1/sales/data/prev-inv",
	// 				bearer: token,
	// 				...(id && {
	// 					params: {
	// 						d: id,
	// 					},
	// 				}),
	// 			});
	// 			if (status.success) {
	// 				const data = F07.transformForReading(payload.data[0]);
	// 				console.log("data", data);
	// 				crud.finishedLoading({
	// 					data: data,
	// 				});
	// 			} else {
	// 				throw error ?? new Error("未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedLoading(err);
	// 		}
	// 	},
	// 	[crud, httpGetAsync, token],
	// );

	const contextValue = useMemo(() => ({
		onSubmit,
		onSubmitError,
		...crud,
		...rest
	}), [crud, onSubmit, onSubmitError, rest])

	// useInit(() => {
	// 	load();
	// }, []);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<RebPosContext.Provider value={contextValue}>
					{children}
				</RebPosContext.Provider>
			</FormMetaProvider>
		</FormProvider>
	);
};

RebPosProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}