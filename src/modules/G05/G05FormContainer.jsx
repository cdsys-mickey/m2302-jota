import { G05Context } from "@/modules/G05/G05Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G05Form from "./G05Form";
import { useCallback } from "react";

export const G05FormContainer = () => {
	const form = useFormContext();
	const g05 = useContext(G05Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			g05.onSubmit,
			g05.onSubmitError
		)
	}, [g05.onSubmit, g05.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			g05.onDebugSubmit,
		)
	}, [g05.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	const onSessionChanged = useCallback(() => {
		form.setValue("SCustID", null);
		form.setValue("ECustID", null);
	}, [form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...g05.formMeta}>
			<G05Form
				forNewCustomer={retail}
				onSubmit={onSubmit}
				onDebugSubmit={onDebugSubmit}
				onSessionChanged={onSessionChanged}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

G05FormContainer.displayName = "G05FormContainer";





