import { AuthContext } from "@/contexts/auth/AuthContext";
import F04 from "@/modules/md-f04";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext, useMemo } from "react";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "./useAppModule";
import CrudContext from "@/contexts/crud/CrudContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import ConfigContext from "@/contexts/config/ConfigContext";

export const useF04 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { token, operator } = useContext(AuthContext);
	const {
		httpGetAsync,
	} = useWebApi();
	const appModule = useAppModule({
		token,
		moduleId: "F04",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		PrtType,
		PrtID,
		outputType,
		`);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebF04Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...F04.transformForSubmitting(payload),
			JobName: "F04",
			DeptID: operator?.CurDeptID,
		};
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator?.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...F04.transformForSubmitting(payload),
				JobName: "F04",
				DeptID: operator?.CurDeptID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[operator?.CurDeptID, reportUrl, reports]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

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
					const data = F04.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.doneLoading({
						data,
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

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		formMeta,
		onDebugSubmit,
		load,
		...crud
	};
};

