import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H04Context } from "./H04Context";
import H04Form from "./H04Form";

export const H04FormContainer = () => {
	const form = useFormContext();
	const h04 = useContext(H04Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			counter,
			InclTest,
			reportType,
			orderType,
			orderDir,
			calType,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onSubmit,
			h04.onSubmitError
		)
	}, [h04.onSubmit, h04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onDebugSubmit,
		)
	}, [h04.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H04Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H04FormContainer.displayName = "H04FormContainer";




