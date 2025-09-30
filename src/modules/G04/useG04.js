import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/helpers/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import G04 from "@/modules/G04/G04.mjs";
import useAction from "@/shared-modules/ActionState/useAction";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useState } from "react";

export const useG04 = () => {
	const crud = useContext(CrudContext);
	const [selectedTab, setSelectedTab] = useState(G04.Tabs.CREATE);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G04",
	});
	const { httpPatchAsync, httpPostAsync, httpDeleteAsync } = useWebApi();

	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = G04.transformForSubmitting(payload);
			console.log("transformed data", data);
			crud.startCreating();
			try {
				const { status, error } = await httpPostAsync({
					url: `v1/sales/recv-account/batches`,
					data,
					bearer: token,
				});
				if (status.success) {
					crud.finishedCreating();
					toastEx.success(`形成成功`);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedCreating();
				toastEx.error("形成失敗", err);
			}
		},
		[crud, httpPostAsync, token]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	const onDeleteSubmit = useCallback(
		async (payload) => {
			console.log("onDeleteSubmit", payload);
			const data = G04.transformForDeleteSubmitting(payload);
			console.log("transformed data", data);
			crud.startDeleting();
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/sales/recv-account/batches`,
					data,
					bearer: token,
				});
				if (status.success) {
					crud.finishedDeleting();
					toastEx.success(`刪除成功`);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedDeleting();
				toastEx.error("刪除失敗", err);
			}
		},
		[crud, httpDeleteAsync, token]
	);

	const onDeleteSubmitError = useCallback((err, data) => {
		console.error("onDeleteSubmitError", err, data);
	}, []);

	const restoreAction = useAction();

	const onRecoverSubmit = useCallback(
		async (payload) => {
			console.log("onRecoverSubmit", payload);
			const data = G04.transformForRecoverSubmitting(payload);
			console.log("transformed data", data);
			restoreAction.start();
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/sales/recv-account/batches/restore`,
					data,
					bearer: token,
				});
				if (status.success) {
					restoreAction.finish();
					toastEx.success(`復原成功`);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				restoreAction.fail();
				toastEx.error("復原失敗", err);
			}
		},
		[httpPatchAsync, restoreAction, token]
	);

	const onRecoverSubmitError = useCallback((err, data) => {
		console.error("onRecoverSubmitError", err, data);
	}, []);

	return {
		...crud,
		...appModule,
		onSubmit,
		onSubmitError,
		onDeleteSubmit,
		onDeleteSubmitError,
		selectedTab,
		handleTabChange,
		// RECOVER
		onRecoverSubmit,
		onRecoverSubmitError,
		restoreWorking: restoreAction.working,
	};
};
