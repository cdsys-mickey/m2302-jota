import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H51Context } from "./H51Context";
import H51Form from "./H51Form";

export const H51FormContainer = () => {
	const form = useFormContext();
	const h51 = useContext(H51Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h51.onSubmit,
			h51.onSubmitError
		)
	}, [h51.onSubmit, h51.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h51.onDebugSubmit,
		)
	}, [h51.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H51Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H51FormContainer.displayName = "H51FormContainer";







