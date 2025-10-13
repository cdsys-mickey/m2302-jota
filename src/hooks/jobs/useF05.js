import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import F05 from "@/modules/md-f05";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useF05 = () => {
	const crud = useContext(CrudContext);
	const { token } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const { httpGetAsync, httpPostAsync } = useWebApi();
	const appModule = useAppModule({
		token,
		moduleId: "F05",
	});

	const formMeta = useFormMeta(
		`

		`
	);

	const handleClose = useCallback(async () => {
		console.log("handleClose");
		try {
			crud.startUpdating();
			const { status, error } = await httpPostAsync({
				url: "v1/inv/taking/staging/close-out",
				bearer: token,
			});
			if (status.success) {
				toastEx.success("結轉已成功");
				// crud.finishedUpdating();
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
	}, [crud, httpPostAsync, token]);

	const confirmClose = useCallback(() => {
		dialogs.confirm({
			message: "確定盤點結轉?",
			onConfirm: () => {
				handleClose();
			},
		});
	}, [dialogs, handleClose]);

	// READ
	const load = useCallback(
		async ({ refresh = false } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/taking/staging-info",
					bearer: token,
				});
				if (status.success) {
					const data = F05.transformForReading(payload.data[0]);
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
		confirmClose,
		formMeta,
		load,
	};
};
