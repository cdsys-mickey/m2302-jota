import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import A21 from "@/modules/md-a21";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext, useMemo } from "react";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import useDebugDialog from "../useDebugDialog";
import useJotaReports from "../useJotaReports";
import { useAppModule } from "./useAppModule";

export const useA21 = ({ form }) => {
	const { token } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "A21",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();


	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebA21Rep.aspx`
	}, [config.REPORT_URL])

	const reports = useJotaReports({ from: "SDate", to: "EDate" });

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = A21.transformForSubmitting(payload);
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A21.transformForSubmitting(payload);
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[reportUrl, reports]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	const formMeta = useFormMeta(
		`
		dept,
		SDate,
		EDate,
		outputType,
		Name,
		Tel,
		InvAddr,
		ToAddr,
		SalesID,
		InvNo,
		DelyNo
		`,
		{
			lastField: form.handleSubmit(
				onSubmit,
				onSubmitError
			)
		}
	)

	return {
		...appModule,
		onDebugSubmit,
		onSubmit,
		onSubmitError,
		formMeta
	};
};
