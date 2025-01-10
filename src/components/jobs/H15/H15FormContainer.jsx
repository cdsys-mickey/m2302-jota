import { FormProvider, useFormContext } from "react-hook-form";
import H15Form from "./H15Form";
import { H15Context } from "@/contexts/H15/H15Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H15FormContainer = () => {
	const form = useFormContext();
	const h15 = useContext(H15Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h15.onSubmit,
			h15.onSubmitError
		)
	}, [h15.onSubmit, h15.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h15.onDebugSubmit,
		)
	}, [h15.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h15.formMeta}>
			<H15Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H15FormContainer.displayName = "H15FormContainer";



