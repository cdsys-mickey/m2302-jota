import { FormProvider, useFormContext } from "react-hook-form";
import H08Form from "./H08Form";
import { H08Context } from "@/contexts/H08/H08Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H08FormContainer = () => {
	const form = useFormContext();
	const h08 = useContext(H08Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h08.onSubmit,
			h08.onSubmitError
		)
	}, [h08.onSubmit, h08.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h08.onDebugSubmit,
		)
	}, [h08.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h08.formMeta}>
			<H08Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H08FormContainer.displayName = "H08FormContainer";



