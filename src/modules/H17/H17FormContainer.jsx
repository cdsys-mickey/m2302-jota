import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H17Context } from "./H17Context";
import H17Form from "./H17Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H17FormContainer = () => {
	const form = useFormContext();
	const h17 = useContext(H17Context);

	const formMeta = useFormMeta(
		`
			SArrDate,
			EArrDate,
			SalType,
			cust,
			cust2,
			SProdID,
			EProdID,
			orderType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h17.onSubmit,
			h17.onSubmitError
		)
	}, [h17.onSubmit, h17.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h17.onDebugSubmit,
		)
	}, [h17.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H17Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H17FormContainer.displayName = "H17FormContainer";






