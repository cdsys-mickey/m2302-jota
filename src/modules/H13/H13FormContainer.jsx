import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H13Context } from "./H13Context";
import H13Form from "./H13Form";

export const H13FormContainer = () => {
	const form = useFormContext();
	const h13 = useContext(H13Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			cust,
			cust2,
			InclTest,
			Local,
			Out,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h13.onSubmit,
			h13.onSubmitError
		)
	}, [h13.onSubmit, h13.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h13.onDebugSubmit,
		)
	}, [h13.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H13Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H13FormContainer.displayName = "H13FormContainer";






