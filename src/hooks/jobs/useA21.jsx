import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A21 from "@/modules/md-a21";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import useJotaReports from "../useJotaReports";
import useDebugDialog from "../useDebugDialog";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

export const useA21 = ({ form }) => {
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A21",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();


	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebA21Rep.aspx`
	}, [])

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
