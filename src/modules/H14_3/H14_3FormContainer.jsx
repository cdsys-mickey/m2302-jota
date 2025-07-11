import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H14_3Context } from "./H14_3Context";
import H14_3Form from "./H14_3Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H14_3FormContainer = () => {
	const form = useFormContext();
	const h141 = useContext(H14_3Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			SDeptID,
			EDeptID,
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
				<H14_3Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H14_3FormContainer.displayName = "H141FormContainer";







