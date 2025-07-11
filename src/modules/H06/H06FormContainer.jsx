import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H06Context } from "./H06Context";
import H06Form from "./H06Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H06FormContainer = () => {
	const form = useFormContext();
	const h06 = useContext(H06Context);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SalType,
			retail,
			SCustID,
			ECustID,
			SAreaID,
			EAreaID,
			SLineID,
			ELineID,
			SProdID,
			EProdID,
			InclTest,
			orderType,
			orderDir,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h06.onSubmit,
			h06.onSubmitError
		)
	}, [h06.onSubmit, h06.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h06.onDebugSubmit,
		)
	}, [h06.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H06Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H06FormContainer.displayName = "H06FormContainer";







