import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H14_1Context } from "./H14_1Context";
import H14_1Form from "./H14_1Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H14_1FormContainer = () => {
	const form = useFormContext();
	const h141 = useContext(H14_1Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SalType,
			retail,
			SCustID,
			ECustID,
			SType,
			reportType,
			orderType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h141.onSubmit,
			h141.onSubmitError
		)
	}, [h141.onSubmit, h141.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h141.onDebugSubmit,
		)
	}, [h141.onDebugSubmit, form]);


	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H14_1Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H14_1FormContainer.displayName = "H141FormContainer";






