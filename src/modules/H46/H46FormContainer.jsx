import { FormProvider, useFormContext } from "react-hook-form";
import H46Form from "./H46Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { H46Context } from "./H46Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H46FormContainer = () => {
	const form = useFormContext();
	const h46 = useContext(H46Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		RsnID,
		reportType,
		outputType
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h46.onSubmit,
			h46.onSubmitError
		)
	}, [h46.onSubmit, h46.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h46.onDebugSubmit,
		)
	}, [h46.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H46Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H46FormContainer.displayName = "H46FormContainer";





