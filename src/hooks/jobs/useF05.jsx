import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import F05 from "@/modules/md-f05";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useAppModule } from "./useAppModule";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";

export const useF05 = () => {
	const crud = useContext(CrudContext);
	const { token } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const {
		httpGetAsync,
		httpPostAsync
	} = useWebApi();
	const appModule = useAppModule({
		token,
		moduleId: "F05",
	});

	const formMeta = useFormMeta(
		`

		`);

	const handleClose = useCallback(
		async () => {
			console.log("handleClose");
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/inv/taking/staging/close-out",
					bearer: token
				})
				if (status.success) {
					toast.success("結轉已成功");
					// crud.doneUpdating();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error(err);
				toast.error(Errors.getMessage("結轉失敗", err));
			} finally {
				crud.doneUpdating();
			}


		},
		[crud, httpPostAsync, token]
	);

	const confirmClose = useCallback(() => {
		dialogs.confirm({
			message: "確定盤點結轉?",
			onConfirm: () => {
				handleClose();
			},
		})
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
					crud.doneLoading({
						data: data,
					});
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failLoading(err);
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