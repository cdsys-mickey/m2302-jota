import { FormProvider, useFormContext } from "react-hook-form";
import H11Form from "./H11Form";
import { H11Context } from "@/contexts/H11/H11Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H11FormContainer = () => {
	const form = useFormContext();
	const h11 = useContext(H11Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h11.onSubmit,
			h11.onSubmitError
		)
	}, [h11.onSubmit, h11.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h11.onDebugSubmit,
		)
	}, [h11.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h11.formMeta}>
			<H11Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H11FormContainer.displayName = "H11FormContainer";



