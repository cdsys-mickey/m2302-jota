import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import G07 from "@/modules/G07/G07";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";

export const useG07 = () => {
	const crud = useContext(CrudContext);
	const dialogs = useContext(DialogsContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G07",
	});

	const {
		httpPostAsync
	} = useWebApi();
	const formMeta = useFormMeta(
		`
		session,
		CustID,
		RptType,
		`
	)

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = {
				...G07.transformForSubmitting(payload),
			}
			console.log("data", data);
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/sales/recv-account/carry-forward",
					bearer: token
				})
				if (status.success) {
					toastEx.success("結轉已成功");
					crud.doneUpdating();
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error(err);
				toastEx.error("結轉失敗", err);
			} finally {
				crud.doneUpdating();
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
			// 				crud.doneUpdating();
			// 			} else {
			// 				throw error ?? new Error("未預期例外");
			// 			}
			// 		} catch (err) {
			// 			crud.failUpdating(err);
			// 			console.error(err);
			// 			toastEx.error("結轉失敗", err);
			// 		} finally {
			// 			crud.doneUpdating();
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

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		formMeta,
	};
};





