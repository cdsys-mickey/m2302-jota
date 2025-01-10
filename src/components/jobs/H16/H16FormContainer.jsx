import { FormProvider, useFormContext } from "react-hook-form";
import H16Form from "./H16Form";
import { H16Context } from "@/contexts/H16/H16Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H16FormContainer = () => {
	const form = useFormContext();
	const h16 = useContext(H16Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h16.onSubmit,
			h16.onSubmitError
		)
	}, [h16.onSubmit, h16.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h16.onDebugSubmit,
		)
	}, [h16.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h16.formMeta}>
			<H16Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H16FormContainer.displayName = "H16FormContainer";



