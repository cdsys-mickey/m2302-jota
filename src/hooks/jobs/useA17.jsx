import CrudContext2 from "@/contexts/crud/CrudContext2";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A17 from "@/modules/md-a17";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toast-ex";

export const useA17 = () => {
	const crud = useContext(CrudContext);
	const { token } = useContext(AuthContext);

	const appModule = useAppModule({
		token,
		moduleId: "A17",
	});
	const { httpGetAsync, httpPutAsync } = useWebApi();

	const loadItem = useCallback(
		async ({ id }) => {
			try {
				crud.startLoading("讀取中...");
				const { status, payload, error } = await httpGetAsync({
					url: `v1/ou/dept/params`,
					bearer: token,
					params: {
						dp: id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A17.transformForReading(payload);
					crud.doneLoading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failLoading(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const handleDeptChanged = useCallback(
		(newValue) => {
			if (newValue?.DeptID) {
				loadItem({ id: newValue?.DeptID });
			}
		},
		[loadItem]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log("onEditorSubmit", data);
			crud.startUpdating();
			try {
				const { status, payload, error } = await httpPutAsync({
					url: `v1/ou/dept/params`,
					bearer: token,
					data: A17.transformForEditorSubmit(data),
				});
				if (status.success) {
					crud.doneUpdating();
					const processed = A17.transformForReading(payload);
					crud.doneLoading({
						data: processed,
					});
					toastEx.success("單位參數已更新");
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				toastEx.error("參數設定失敗", err);
			}
		},
		[crud, httpPutAsync, token]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.log("onEditorSubmitError", err);
	}, []);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...crud,
		...appModule,
		loadItem,
		// form
		onEditorSubmit,
		onEditorSubmitError,
		handleDeptChanged,
	};
};
