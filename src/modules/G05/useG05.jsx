import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import G05 from "@/modules/G05/G05";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";

export const useG05 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G05",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		AccYM,
		session,
		SCustID,
		ECustID,
		RptType,
		outputType,
		`
	)

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebG05Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...G05.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		}
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);


	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...G05.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			}
			console.log("data", data);
			// postToBlank(
			// 	queryString.stringifyUrl({
			// 		url: reportUrl,
			// 		query: {
			// 			LogKey: operator.LogKey
			// 		}
			// 	}),
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
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
		formMeta,
	};
};


