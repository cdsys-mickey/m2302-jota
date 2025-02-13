import { FormProvider, useFormContext } from "react-hook-form";
import H25Form from "./H25Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H25Context } from "./H25Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H25FormContainer = () => {
	const form = useFormContext();
	const h25 = useContext(H25Context);

	const formMeta = useFormMeta(
		`
			ArrDate,
			SFactID,
			EFactID,
			SProdID,
			EProdID,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h25.onSubmit,
			h25.onSubmitError
		)
	}, [h25.onSubmit, h25.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h25.onDebugSubmit,
		)
	}, [h25.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H25Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H25FormContainer.displayName = "H25FormContainer";



