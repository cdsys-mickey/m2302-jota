import { AuthContext } from "@/contexts/auth/AuthContext";
import { ConfigContext } from "shared-components/config";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import P52 from "@/modules/P52/P52.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext, useMemo } from "react";

export const useP52 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "P52",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebP52Rep.aspx`;
	}, [config.REPORT_URL]);

	const reports = useJotaReports(
		[
			{ from: "SDate", to: "EDate" },
			{ from: "SPayDate", to: "EPayDate" },
		],
		{
			name: "所有",
		},
	);

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...P52.transformForSubmitting(payload),
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
		],
	);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...P52.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[operator.CurDeptID, reportUrl, reports],
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
