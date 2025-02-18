import { FormProvider, useFormContext } from "react-hook-form";
import H50Form from "./H50Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H50Context } from "./H50Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H50FormContainer = () => {
	const form = useFormContext();
	const h50 = useContext(H50Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		orderType,
		outputType,
		`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h50.onSubmit,
			h50.onSubmitError
		)
	}, [h50.onSubmit, h50.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h50.onDebugSubmit,
		)
	}, [h50.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H50Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H50FormContainer.displayName = "H50FormContainer";




