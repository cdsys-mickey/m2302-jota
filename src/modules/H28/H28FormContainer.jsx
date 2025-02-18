import { FormProvider, useFormContext } from "react-hook-form";
import H28Form from "./H28Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H28Context } from "./H28Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H28FormContainer = () => {
	const form = useFormContext();
	const h28 = useContext(H28Context);
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
			h28.onSubmit,
			h28.onSubmitError
		)
	}, [h28.onSubmit, h28.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h28.onDebugSubmit,
		)
	}, [h28.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H28Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H28FormContainer.displayName = "H28FormContainer";



