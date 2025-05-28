import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { P09Context } from "./P09Context";
import P09Form from "./P09Form";
import { useHotkeys } from "react-hotkeys-hook";

export const P09FormContainer = () => {
	const form = useFormContext();
	const p09 = useContext(P09Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			Source,
			retail,
			SCustID,
			ECustID,
			SProdID,
			EProdID,
			InclTest,
			RptType,
			OrdName,
			OrdSeq,
			Rate,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p09.onSubmit,
			p09.onSubmitError
		)
	}, [p09.onSubmit, p09.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p09.onDebugSubmit,
		)
	}, [p09.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<P09Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

P09FormContainer.displayName = "P09FormContainer";







