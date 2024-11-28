import { AuthContext } from "@/contexts/auth/AuthContext";
import A18 from "@/modules/md-a18";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useCallback, useContext, useMemo } from "react";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import useDebugDialog from "../useDebugDialog";
import { useAppModule } from "./useAppModule";
import queryString from "query-string";

export const useA18 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A18",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		dept,
		table,
		outputType,
		SDate,
		EDate,
		action
		`);

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebA19Rep.aspx`
	}, [])

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = A18.transformForSubmitting(payload);
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A18.transformForSubmitting(payload);
			console.log("data", data);
			postToBlank(
				queryString.stringifyUrl({
					url: reportUrl,
					query: {
						LogKey: operator.LogKey
					}
				}),
				{
					jsonData: JSON.stringify(data),
				}
			);
		},
		[operator.LogKey, postToBlank, reportUrl]
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
[];
