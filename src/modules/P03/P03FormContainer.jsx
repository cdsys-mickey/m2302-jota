import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { P03Context } from "./P03Context";
import P03Form from "./P03Form";
import { useHotkeys } from "react-hotkeys-hook";

export const P03FormContainer = () => {
	const form = useFormContext();
	const p03 = useContext(P03Context);

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
			p03.onSubmit,
			p03.onSubmitError
		)
	}, [p03.onSubmit, p03.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p03.onDebugSubmit,
		)
	}, [p03.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<P03Form forNewCustomer={retail} onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

P03FormContainer.displayName = "P03FormContainer";







