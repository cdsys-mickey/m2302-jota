import { FormProvider, useFormContext } from "react-hook-form";
import H10Form from "./H10Form";
import { H10Context } from "@/contexts/H10/H10Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H10FormContainer = () => {
	const form = useFormContext();
	const h10 = useContext(H10Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h10.onSubmit,
			h10.onSubmitError
		)
	}, [h10.onSubmit, h10.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h10.onDebugSubmit,
		)
	}, [h10.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h10.formMeta}>
			<H10Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H10FormContainer.displayName = "H10FormContainer";



