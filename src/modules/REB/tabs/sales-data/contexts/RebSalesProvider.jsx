import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import REB from "@/modules/REB/REB.mjs";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useWebApiAsync } from "@/shared-hooks";
import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormMetaProvider } from "@/shared-components";
import { toastEx } from "shared-components";
import { RebSalesContext } from "./RebSalesContext";

export const RebSalesProvider = ({ children, ...rest }) => {

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
							data,
						});
						if (status.success) {
							toastEx.success(payload?.message || "重整已成功");
							crud.finishedUpdating();
						} else {
							throw (
								error ??
								new Error(payload?.message || "發生未預期例外")
							);
						}
					} catch (err) {
						crud.failedUpdating(err);
						console.error(err);
						toastEx.error("重整失敗", err);
					} finally {
						crud.finishedUpdating();
					}
				},
			});
		},
		[crud, dialogs, httpPostAsync, token],
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
				<RebSalesContext.Provider value={contextValue}>
					{children}
				</RebSalesContext.Provider>
			</FormMetaProvider>
		</FormProvider>
	);
};

RebSalesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}