import { FormProvider, useFormContext } from "react-hook-form";
import H141Form from "./H141Form";
import { H141Context } from "@/contexts/H141/H141Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H141FormContainer = () => {
	const form = useFormContext();
	const h141 = useContext(H141Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h141.onSubmit,
			h141.onSubmitError
		)
	}, [h141.onSubmit, h141.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h141.onDebugSubmit,
		)
	}, [h141.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h141.formMeta}>
			<H141Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H141FormContainer.displayName = "H141FormContainer";



