import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H43Context } from "./H43Context";
import H43Form from "./H43Form";

export const H43FormContainer = () => {
	const form = useFormContext();
	const h43 = useContext(H43Context);

	const formMeta = useFormMeta(
		`
			SArrDate,
			EArrDate,
			SDeptID,
			EDeptID,
			orderType,
			outputType
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h43.onSubmit,
			h43.onSubmitError
		)
	}, [h43.onSubmit, h43.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h43.onDebugSubmit,
		)
	}, [h43.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H43Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H43FormContainer.displayName = "H43FormContainer";








