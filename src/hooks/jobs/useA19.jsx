import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A19 from "@/modules/md-a19";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "../../shared-contexts/form-meta/LastFieldBehavior";
import useDebugDialog from "../useDebugDialog";
import { useMemo } from "react";

export const useA19 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A19",
	});
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
		return `${import.meta.env.VITE_URL_REPORT}/WebA19Rep.aspx?LogKey=${operator.LogKey}`
	}, [operator.LogKey])

	const onDebugSubmit = useCallback((payload) => {
		console.log("onSubmit", payload);
		const data = A19.transformForSubmitting(payload);
		debugDialog.show({ data, url: reportUrl })
	}, [debugDialog, reportUrl]);

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A19.transformForSubmitting(payload);
			console.log("data", data);
			postToBlank(reportUrl,
				{
					jsonData: JSON.stringify(data),
				}
			);
		},
		[postToBlank, reportUrl]
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
[];
