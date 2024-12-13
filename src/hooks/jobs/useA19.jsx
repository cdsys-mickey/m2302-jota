import { AuthContext } from "@/contexts/auth/AuthContext";
import A19 from "@/modules/md-a19";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback, useContext, useMemo } from "react";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "./useAppModule";

export const useA19 = () => {
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A19",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		sprod,
		eprod,
		sdept,
		edept,
		SDate,
		EDate,
		dataType,
		outputType,
		transIncluded
		`, {
		lastField: LastFieldBehavior.PROMPT
	}
	)

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebA19Rep.aspx`
	}, [])

	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = A19.transformForSubmitting(payload);
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A19.transformForSubmitting(payload);
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[reportUrl, reports]
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
