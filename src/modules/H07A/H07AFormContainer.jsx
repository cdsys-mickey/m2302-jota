import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H07AContext } from "./H07AContext";
import H07AForm from "./H07AForm";
import { useHotkeys } from "react-hotkeys-hook";

export const H07AFormContainer = () => {
	const form = useFormContext();
	const h07a = useContext(H07AContext);

	const formMeta = useFormMeta(
		`
			SDate1,
			EDate1,
			SDate2,
			EDate2,
			SalType,
			employee,
			orderDir,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h07a.onSubmit,
			h07a.onSubmitError
		)
	}, [h07a.onSubmit, h07a.onSubmitError, form]);


	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h07a.onDebugSubmit,
		)
	}, [h07a.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H07AForm onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H07AFormContainer.displayName = "H07AFormContainer";






