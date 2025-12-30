import { AuthContext } from "@/contexts/auth/AuthContext";
import { ConfigContext } from "shared-components/config";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import H17 from "@/modules/H17/H17.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext, useMemo } from "react";

export const useH17 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "H17",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebH17Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports({ from: "SArrDate", to: "EArrDate" });

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H17.transformForSubmitting(payload),
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
				...H17.transformForSubmitting(payload),
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

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		onDebugSubmit,
	};
};
