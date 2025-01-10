import { FormProvider, useFormContext } from "react-hook-form";
import H07Form from "./H07Form";
import { H07Context } from "@/contexts/H07/H07Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H07FormContainer = () => {
	const form = useFormContext();
	const h07 = useContext(H07Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h07.onSubmit,
			h07.onSubmitError
		)
	}, [h07.onSubmit, h07.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h07.onDebugSubmit,
		)
	}, [h07.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h07.formMeta}>
			<H07Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H07FormContainer.displayName = "H07FormContainer";



