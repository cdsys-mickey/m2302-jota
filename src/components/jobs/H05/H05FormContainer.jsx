import { FormProvider, useFormContext } from "react-hook-form";
import H05Form from "./H05Form";
import { H05Context } from "@/contexts/H05/H05Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H05FormContainer = () => {
	const form = useFormContext();
	const h05 = useContext(H05Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h05.onSubmit,
			h05.onSubmitError
		)
	}, [h05.onSubmit, h05.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h05.onDebugSubmit,
		)
	}, [h05.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h05.formMeta}>
			<H05Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H05FormContainer.displayName = "H05FormContainer";



