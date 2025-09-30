import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/helpers/toastEx";
import P04 from "@/modules/md-p04";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useP04 = () => {
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "P04",
	});
	const crud = useContext(CrudContext);
	const { httpDeleteAsync } = useWebApi();
	const dialogs = useContext(DialogsContext);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SPosNo,
		`
	);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = P04.transformForSubmitting(payload);
			dialogs.confirm({
				message: `確認要清除${
					data?.posno ? `收銀機號[${data?.posno}]` : ""
				} ${data?.sdate}${
					data?.edate ? ` ~ ${data?.edate}` : ""
				} 的銷售資料?`,
				onConfirm: async () => {
					crud.startLoading();
					try {
						const { status, error } = await httpDeleteAsync({
							url: "v1/pos/sales-data",
							params: data,
							bearer: token,
						});
						if (status.success) {
							toastEx.success("收銀機銷售資料已清除");
						} else {
							throw error ?? new Error("未預期例外");
						}
					} catch (err) {
						console.error(err);
						toastEx.error("清除失敗", err);
					}
				},
			});
		},
		[crud, dialogs, httpDeleteAsync, token]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		formMeta,
	};
};
