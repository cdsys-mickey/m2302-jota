import { FormProvider, useFormContext } from "react-hook-form";
import P10Form from "./P10Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { P10Context } from "./P10Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const P10FormContainer = () => {
	const form = useFormContext();
	const p10 = useContext(P10Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			RptType,
			OrdName,
			OrdSeq,
			Top,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			p10.onSubmit,
			p10.onSubmitError
		)
	}, [p10.onSubmit, p10.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p10.onDebugSubmit,
		)
	}, [p10.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P10Form
				onDebugSubmit={onDebugSubmit}
				onSubmit={onSubmit}
			// onSelect={p10.onSelect({ setValue: form.setValue })}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

P10FormContainer.displayName = "P10FormContainer";



