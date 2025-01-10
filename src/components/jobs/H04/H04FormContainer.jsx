import { FormProvider, useFormContext } from "react-hook-form";
import H04Form from "./H04Form";
import { H04Context } from "@/contexts/H04/H04Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H04FormContainer = () => {
	const form = useFormContext();
	const h04 = useContext(H04Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onSubmit,
			h04.onSubmitError
		)
	}, [h04.onSubmit, h04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onDebugSubmit,
		)
	}, [h04.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h04.formMeta}>
			<H04Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H04FormContainer.displayName = "H04FormContainer";



