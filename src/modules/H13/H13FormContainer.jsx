import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H13Context } from "./H13Context";
import H13Form from "./H13Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H13FormContainer = () => {
	const form = useFormContext();
	const h13 = useContext(H13Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SCustID,
			ECustID,
			InclTest,
			Local,
			Out,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h13.onSubmit,
			h13.onSubmitError
		)
	}, [h13.onSubmit, h13.onSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h13.onDebugSubmit,
		)
	}, [h13.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H13Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H13FormContainer.displayName = "H13FormContainer";






