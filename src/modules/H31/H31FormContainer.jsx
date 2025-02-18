import { FormProvider, useFormContext } from "react-hook-form";
import H31Form from "./H31Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H31Context } from "./H31Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H31FormContainer = () => {
	const form = useFormContext();
	const h31 = useContext(H31Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SFactID,
			EFactID,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h31.onSubmit,
			h31.onSubmitError
		)
	}, [h31.onSubmit, h31.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h31.onDebugSubmit,
		)
	}, [h31.onDebugSubmit, form]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<H31Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H31FormContainer.displayName = "H31FormContainer";




