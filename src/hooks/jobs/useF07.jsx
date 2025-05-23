import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import F07 from "@/modules/md-f07";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useF07 = () => {
	const crud = useContext(CrudContext);
	const { token } = useContext(AuthContext);
	const {
		httpGetAsync,
		httpPostAsync
	} = useWebApi();
	const dialogs = useContext(DialogsContext);
	const appModule = useAppModule({
		token,
		moduleId: "F07",
	});

	const formMeta = useFormMeta(
		`

		`);



	// READ
	const load = useCallback(
		async ({ refresh = false } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/taking/carry-forward",
					bearer: token,
				});
				if (status.success) {
					const data = F07.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.doneLoading({
						data: data,
					});
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failLoading(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const handleCarryForward = useCallback(
		async () => {
			console.log("handleCarryForward");
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/inv/taking/carry-forward",
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
				load();
			}


		},
		[crud, httpPostAsync, load, token]
	);

	const confirmCarryForward = useCallback(() => {
		dialogs.confirm({
			message: "確定將庫存進行月結轉?",
			onConfirm: () => {
				handleCarryForward();
			},
		})
	}, [dialogs, handleCarryForward]);

	return {
		...appModule,
		...crud,
		confirmCarryForward,
		formMeta,
		load,
	};
};

