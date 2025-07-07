import { AuthContext } from "@/contexts/auth/AuthContext";
import H45 from "@/modules/H45/H45.mjs"
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import ConfigContext from "@/contexts/config/ConfigContext";

export const useH45 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "H45",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();



	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebH45Rep.aspx`
	}, [config.REPORT_URL])

	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...H45.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		};
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload, e) => {
			e?.preventDefault();
			console.log("onSubmit", payload);
			const data = {
				...H45.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			}
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[operator.CurDeptID, reportUrl, reports]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		onDebugSubmit,
	};
};


