import { AuthContext } from "@/contexts/auth/AuthContext";
import H01 from "@/modules/H01/H01.mjs"
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";
import useJotaReports from "@/hooks/useJotaReports";

export const useH01 = () => {
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "H01",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		InclTX,
		InclTest,
		outputType,
		`
	)

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebH01Rep.aspx`
	}, [])

	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...H01.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		};
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H01.transformForSubmitting(payload),
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
		formMeta,
	};
};