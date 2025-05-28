import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H10Context } from "./H10Context";
import H10Form from "./H10Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H10FormContainer = () => {
	const form = useFormContext();
	const h10 = useContext(H10Context);

	const formMeta = useFormMeta(
		`
			SDate1,
			EDate1,
			SDate2,
			EDate2,
			SAreaID,
			EAreaID,
			SLineID,
			ELineID,
			SalType,
			TopNo,
			reportType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h10.onSubmit,
			h10.onSubmitError
		)
	}, [h10.onSubmit, h10.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h10.onDebugSubmit,
		)
	}, [h10.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H10Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H10FormContainer.displayName = "H10FormContainer";





