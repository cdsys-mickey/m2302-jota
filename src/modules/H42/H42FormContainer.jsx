import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H42Context } from "./H42Context";
import H42Form from "./H42Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H42FormContainer = () => {
	const form = useFormContext();
	const h42 = useContext(H42Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SArrDate,
			EArrDate,
			SProdID,
			EProdID,
			SDeptID,
			EDeptID,
			reportType,
			orderType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h42.onSubmit,
			h42.onSubmitError
		)
	}, [h42.onSubmit, h42.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h42.onDebugSubmit,
		)
	}, [h42.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H42Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H42FormContainer.displayName = "H42FormContainer";







