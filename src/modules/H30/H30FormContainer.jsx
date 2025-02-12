import { FormProvider, useFormContext } from "react-hook-form";
import H30Form from "./H30Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H30Context } from "./H30Context";

export const H30FormContainer = () => {
	const form = useFormContext();
	const h30 = useContext(H30Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h30.onSubmit,
			h30.onSubmitError
		)
	}, [h30.onSubmit, h30.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h30.onDebugSubmit,
		)
	}, [h30.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h30.formMeta}>
			<H30Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H30FormContainer.displayName = "H30FormContainer";



