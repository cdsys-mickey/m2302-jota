import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import H21 from "@/modules/H21/H21.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useMemo } from "react";

export const useH21 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "H21",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();
	const { httpGetAsync } = useWebApiAsync();

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebH21Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports({ month: "CutYM" });

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H21.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			};
			debugDialog.show({
				data,
				url: reportUrl,
				title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}`,
			});
		},
		[
			appFrame.menuItemSelected?.JobID,
			appFrame.menuItemSelected?.JobName,
			debugDialog,
			operator.CurDeptID,
			reportUrl,
		]
	);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H21.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			};
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
			bearer: token,
		});
		if (status.success) {
			return payload["CutYM"];
		}
	}, [httpGetAsync, token]);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		onDebugSubmit,
		getCutYM,
	};
};
