import { FormProvider, useFormContext } from "react-hook-form";
import G01Form from "./G01Form";
import { G01Context } from "@/modules/G01/G01Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const G01FormContainer = () => {
	const form = useFormContext();
	const g01 = useContext(G01Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			g01.onSubmit,
			g01.onSubmitError
		)
	}, [g01.onSubmit, g01.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			g01.onDebugSubmit,
		)
	}, [g01.onDebugSubmit, form]);

	const handleCustomerChange = useCallback((newCustomer) => {
		form.setValue("CustName", newCustomer?.AbbrName || newCustomer?.CustData || "");
	}, [form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...g01.formMeta}>
			<G01Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} onCustomerChange={handleCustomerChange} />
		</FormMetaProvider>
	</FormProvider>;
};

G01FormContainer.displayName = "G01FormContainer";




