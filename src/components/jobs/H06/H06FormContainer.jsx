import { FormProvider, useFormContext } from "react-hook-form";
import H06Form from "./H06Form";
import { H06Context } from "@/contexts/H06/H06Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H06FormContainer = () => {
	const form = useFormContext();
	const h06 = useContext(H06Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h06.onSubmit,
			h06.onSubmitError
		)
	}, [h06.onSubmit, h06.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h06.onDebugSubmit,
		)
	}, [h06.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h06.formMeta}>
			<H06Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H06FormContainer.displayName = "H06FormContainer";



