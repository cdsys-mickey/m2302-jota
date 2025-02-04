import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H16Context } from "./H16Context";
import H16Form from "./H16Form";

export const H16FormContainer = () => {
	const form = useFormContext();
	const h16 = useContext(H16Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SArrDate,
			EArrDate,
			SProdID,
			EProdID,
			retail,
			cust,
			cust2,
			reportType,
			orderType,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h16.onSubmit,
			h16.onSubmitError
		)
	}, [h16.onSubmit, h16.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h16.onDebugSubmit,
		)
	}, [h16.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H16Form forNewCustomer={retail} onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H16FormContainer.displayName = "H16FormContainer";






