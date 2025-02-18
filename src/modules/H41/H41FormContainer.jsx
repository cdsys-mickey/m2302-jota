import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import H41Form from "./H41Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H41Context } from "./H41Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";

export const H41FormContainer = () => {
	const form = useFormContext();
	const h41 = useContext(H41Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		retail,
		SCustID,
		ECustID,
		SDeptID,
		EDeptID,
		RsnID,
		reportType,
		outputType,
		`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h41.onSubmit,
			h41.onSubmitError
		)
	}, [h41.onSubmit, h41.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h41.onDebugSubmit,
		)
	}, [h41.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H41Form forNewCustomer={retail} onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H41FormContainer.displayName = "H41FormContainer";




