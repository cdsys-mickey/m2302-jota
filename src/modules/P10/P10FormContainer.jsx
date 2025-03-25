import { FormProvider, useFormContext } from "react-hook-form";
import P10Form from "./P10Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { P10Context } from "./P10Context";

export const P10FormContainer = () => {
	const form = useFormContext();
	const p10 = useContext(P10Context);

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
		<FormMetaProvider {...p10.formMeta}>
			<P10Form
				onDebugSubmit={onDebugSubmit}
				onSubmit={onSubmit}
			// onSelect={p10.onSelect({ setValue: form.setValue })}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

P10FormContainer.displayName = "P10FormContainer";



