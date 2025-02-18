import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H08Context } from "./H08Context";
import H08Form from "./H08Form";

export const H08FormContainer = () => {
	const form = useFormContext();
	const h08 = useContext(H08Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SalType,
			retail,
			SCustID,
			ECustID,
			orderType,
			orderDir,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h08.onSubmit,
			h08.onSubmitError
		)
	}, [h08.onSubmit, h08.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h08.onDebugSubmit,
		)
	}, [h08.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H08Form forNewCustomer={retail} onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H08FormContainer.displayName = "H08FormContainer";





