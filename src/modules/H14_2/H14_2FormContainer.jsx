import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H14_2Context } from "./H14_2Context";
import H14_2Form from "./H14_2Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H14_2FormContainer = () => {
	const form = useFormContext();
	const h141 = useContext(H14_2Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SPDlineID,
			EPDlineID,
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

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
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
				<H14_2Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H14_2FormContainer.displayName = "H141FormContainer";







