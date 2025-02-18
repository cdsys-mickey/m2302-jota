import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H06Context } from "./H06Context";
import H06Form from "./H06Form";

export const H06FormContainer = () => {
	const form = useFormContext();
	const h06 = useContext(H06Context);

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

	const onSubmit = useMemo(() => {
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

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H06Form forNewCustomer={retail} onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H06FormContainer.displayName = "H06FormContainer";







