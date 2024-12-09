import { FormProvider, useFormContext } from "react-hook-form";
import H02Form from "./H02Form";
import { H02Context } from "@/contexts/H02/H02Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H02FormContainer = () => {
	const form = useFormContext();
	const h02 = useContext(H02Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h02.onSubmit,
			h02.onSubmitError
		)
	}, [h02.onSubmit, h02.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h02.onDebugSubmit,
		)
	}, [h02.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h02.formMeta}>
			<H02Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H02FormContainer.displayName = "H02FormContainer";



