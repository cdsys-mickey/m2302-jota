import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import G04 from "@/modules/G04/G04.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo } from "react";

export const useG04 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G04",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();
	const { httpGetAsync } = useWebApi();

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebG04Rep.aspx`
	}, [config.REPORT_URL])

	const reports = useJotaReports({ month: "CutYM" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...G04.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		};
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...G04.transformForSubmitting(payload),
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

	const getCutYM = useCallback(async () => {
		const { status, payload } = await httpGetAsync({
			url: "v2/ou/dept/params/cut-ym",
			bearer: token
		});
		if (status.success) {
			return payload["CutYM"]
		}
	}, [httpGetAsync, token]);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		onDebugSubmit,
		getCutYM
	};
};




