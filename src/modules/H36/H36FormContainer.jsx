import { FormProvider, useFormContext } from "react-hook-form";
import H36Form from "./H36Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H36Context } from "./H36Context";

export const H36FormContainer = () => {
	const form = useFormContext();
	const h36 = useContext(H36Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h36.onSubmit,
			h36.onSubmitError
		)
	}, [h36.onSubmit, h36.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h36.onDebugSubmit,
		)
	}, [h36.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h36.formMeta}>
			<H36Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H36FormContainer.displayName = "H36FormContainer";



