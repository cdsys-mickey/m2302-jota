import { G09Context } from "@/modules/G09/G09Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G09Form from "./G09Form";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const G09FormContainer = () => {
	const form = useFormContext();
	const g09 = useContext(G09Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			g09.onSubmit,
			g09.onSubmitError
		)
	}, [g09.onSubmit, g09.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			g09.onDebugSubmit,
		)
	}, [g09.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	const onSessionChanged = useCallback(() => {
		form.setValue("CustID", null);
	}, [form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...g09.formMeta}>
			<G09Form
				forNewCustomer={retail}
				onSubmit={handleSubmit}
				onDebugSubmit={onDebugSubmit}
				onSessionChanged={onSessionChanged}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

G09FormContainer.displayName = "G09FormContainer";






