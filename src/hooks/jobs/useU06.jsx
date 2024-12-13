import { AuthContext } from "@/contexts/auth/AuthContext";
import U06 from "@/modules/md-u06";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useCallback, useContext, useMemo } from "react";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "./useAppModule";

export const useU06 = () => {
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "U06",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		SDeptID,
		SDate,
		EDate,
		RptType,
		outputType,
		`,
	)

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebU06Rep.aspx`
	}, [])
	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...U06.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		}
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...U06.transformForSubmitting(payload),
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
