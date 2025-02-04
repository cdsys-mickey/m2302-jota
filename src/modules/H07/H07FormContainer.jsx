import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H07Context } from "./H07Context";
import H07Form from "./H07Form";

export const H07FormContainer = () => {
	const form = useFormContext();
	const h07 = useContext(H07Context);

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
			h07.onSubmit,
			h07.onSubmitError
		)
	}, [h07.onSubmit, h07.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h07.onDebugSubmit,
		)
	}, [h07.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H07Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H07FormContainer.displayName = "H07FormContainer";





