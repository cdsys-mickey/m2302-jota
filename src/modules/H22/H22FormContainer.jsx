import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H22Context } from "./H22Context";
import H22Form from "./H22Form";

export const H22FormContainer = () => {
	const form = useFormContext();
	const h22 = useContext(H22Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SalType,
			InclTest,
			orderType,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h22.onSubmit,
			h22.onSubmitError
		)
	}, [h22.onSubmit, h22.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h22.onDebugSubmit,
		)
	}, [h22.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H22Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H22FormContainer.displayName = "H22FormContainer";






