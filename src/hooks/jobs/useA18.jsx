import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A18 from "@/modules/md-a18";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "../../shared-contexts/form-meta/LastFieldBehavior";

export const useA18 = () => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A18",
	});

	const formMeta = useFormMeta(
		`
		dept,
		table,
		outputType,
		SDate,
		EDate,
		action
		`,
		{
			lastField: LastFieldBehavior.PROMPT
		});

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A18.transformForSubmitting(payload);
			console.log("data", data);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebA18Rep.aspx?LogKey=${operator.LogKey
				}`,
				{
					jsonData: JSON.stringify(data),
				}
			);
		},
		[operator.LogKey, postToBlank]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		onSubmit,
		onSubmitError,
		formMeta
	};
};
[];
