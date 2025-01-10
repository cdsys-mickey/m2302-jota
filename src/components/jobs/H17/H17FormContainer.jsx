import { FormProvider, useFormContext } from "react-hook-form";
import H17Form from "./H17Form";
import { H17Context } from "@/contexts/H17/H17Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H17FormContainer = () => {
	const form = useFormContext();
	const h17 = useContext(H17Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h17.onSubmit,
			h17.onSubmitError
		)
	}, [h17.onSubmit, h17.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h17.onDebugSubmit,
		)
	}, [h17.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h17.formMeta}>
			<H17Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H17FormContainer.displayName = "H17FormContainer";



