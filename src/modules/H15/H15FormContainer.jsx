import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H15Context } from "./H15Context";
import H15Form from "./H15Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H15FormContainer = () => {
	const form = useFormContext();
	const h15 = useContext(H15Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SalType,
			retail,
			cust,
			cust2,
			reason,
			reportType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h15.onSubmit,
			h15.onSubmitError
		)
	}, [h15.onSubmit, h15.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h15.onDebugSubmit,
		)
	}, [h15.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H15Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H15FormContainer.displayName = "H15FormContainer";






