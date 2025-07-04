import { FormProvider, useFormContext } from "react-hook-form";
import H40Form from "./H40Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H40Context } from "./H40Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H40FormContainer = () => {
	const form = useFormContext();
	const h40 = useContext(H40Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SPDlineID,
		EPDlineID,
		reportType,
		orderType,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h40.onSubmit,
			h40.onSubmitError
		)
	}, [h40.onSubmit, h40.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h40.onDebugSubmit,
		)
	}, [h40.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H40Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H40FormContainer.displayName = "H40FormContainer";




