import { AuthContext } from "@/contexts/auth/AuthContext";
import F06 from "@/modules/md-f06";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext, useMemo } from "react";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "./useAppModule";

export const useF06 = () => {
	const { operator, token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "F06",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		accEntry,
		PrtType,
		outputType,
		`);

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebF06Rep.aspx`
	}, [])
	const reports = useJotaReports();

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...F06.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		};
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...F06.transformForSubmitting(payload),
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
		formMeta,
		onDebugSubmit
	};
};
