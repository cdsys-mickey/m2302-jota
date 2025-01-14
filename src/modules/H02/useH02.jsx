import { AuthContext } from "@/contexts/auth/AuthContext";
import H02 from "@/modules/H02/H02";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import useHttpPost from "@/shared-hooks/useHttpPost";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useDebugDialog from "@/hooks/useDebugDialog";

export const useH02 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "H02",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const formMeta = useFormMeta(
		`
		SalYM,
		SProdID,
		EProdID,
		InclTX,
		InclTest,
		outputType,
		`
	)

	const reportUrl = useMemo(() => {
		return `${import.meta.env.VITE_URL_REPORT}/WebH02Rep.aspx`
	}, [])

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = {
			...H02.transformForSubmitting(payload),
			DeptId: operator.CurDeptID,
		}
		debugDialog.show({ data, url: reportUrl, title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}` })
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName, debugDialog, operator.CurDeptID, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = {
				...H02.transformForSubmitting(payload),
				DeptId: operator.CurDeptID,
			}
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
		[operator.CurDeptID, operator.LogKey, postToBlank, reportUrl]
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
