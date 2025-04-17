import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";
import G01 from "@/modules/G01/G01";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";

export const useG01 = () => {
	const config = useContext(ConfigContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "G01",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		EDate,
		CustID,
		CustName,
		Tel,
		outputType,
		`
	)

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebG01Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...G01.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		}
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);


	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...G01.transformForSubmitting(payload),
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
		formMeta,
	};
};

