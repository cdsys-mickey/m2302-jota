import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A21 from "@/modules/md-a21";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useAppModule } from "./useAppModule";
import { useFormMeta } from "../../shared-contexts/form-meta/useFormMeta";
import { useFormContext } from "react-hook-form";

export const useA21 = ({ form }) => {
	const { token, operator } = useContext(AuthContext);
	const { postToBlank } = useHttpPost();
	const appModule = useAppModule({
		token,
		moduleId: "A21",
	});


	/**
	 * Name,
		Tel,
		InvAddr,
		ToAddr,
		SalesID,
		InvNo,
		DelyNo
	 */

	const onSubmit = useCallback(
		(payload) => {
			console.log("onSubmit", payload);
			const data = A21.transformForSubmitting(payload);
			console.log("data", data);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebA21Rep.aspx?LogKey=${operator.LogKey
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
		onSubmit,
		onSubmitError,
		formMeta
	};
};
[];
