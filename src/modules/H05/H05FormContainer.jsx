import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H05Context } from "./H05Context";
import H05Form from "./H05Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H05FormContainer = () => {
	const form = useFormContext();
	const h05 = useContext(H05Context);

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
			reportType,
			InclTest,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h05.onSubmit,
			h05.onSubmitError
		)
	}, [h05.onSubmit, h05.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h05.onDebugSubmit,
		)
	}, [h05.onDebugSubmit, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H05Form
					forNewCustomer={retail}
					onSubmit={handleSubmit}
					onDebugSubmit={onDebugSubmit}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

H05FormContainer.displayName = "H05FormContainer";






