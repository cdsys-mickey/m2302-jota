import { FormProvider, useFormContext } from "react-hook-form";
import H13Form from "./H13Form";
import { H13Context } from "@/contexts/H13/H13Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H13FormContainer = () => {
	const form = useFormContext();
	const h13 = useContext(H13Context);

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

	return <FormProvider {...form}>
		<FormMetaProvider {...h13.formMeta}>
			<H13Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H13FormContainer.displayName = "H13FormContainer";



