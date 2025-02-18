import { FormProvider, useFormContext } from "react-hook-form";
import H38Form from "./H38Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H38Context } from "./H38Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H38FormContainer = () => {
	const form = useFormContext();
	const h38 = useContext(H38Context);

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
			h38.onSubmit,
			h38.onSubmitError
		)
	}, [h38.onSubmit, h38.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h38.onDebugSubmit,
		)
	}, [h38.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H38Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H38FormContainer.displayName = "H38FormContainer";




