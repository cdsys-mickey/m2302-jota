import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H141Context } from "./H141Context";
import H141Form from "./H141Form";

export const H141FormContainer = () => {
	const form = useFormContext();
	const h141 = useContext(H141Context);

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
			SType,
			reportType,
			orderType,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h141.onSubmit,
			h141.onSubmitError
		)
	}, [h141.onSubmit, h141.onSubmitError, form]);

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
				<H141Form forNewCustomer={retail} onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H141FormContainer.displayName = "H141FormContainer";






