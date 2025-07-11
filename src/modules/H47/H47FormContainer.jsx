import { FormProvider, useFormContext } from "react-hook-form";
import H47Form from "./H47Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { H47Context } from "./H47Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H47FormContainer = () => {
	const form = useFormContext();
	const h47 = useContext(H47Context);

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
			h47.onSubmit,
			h47.onSubmitError
		)
	}, [h47.onSubmit, h47.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h47.onDebugSubmit,
		)
	}, [h47.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H47Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H47FormContainer.displayName = "H47FormContainer";






