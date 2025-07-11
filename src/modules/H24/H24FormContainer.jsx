import { FormProvider, useFormContext } from "react-hook-form";
import H24Form from "./H24Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { H24Context } from "./H24Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H24FormContainer = () => {
	const form = useFormContext();
	const h24 = useContext(H24Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		SPDlineID,
		ELineID,
		reportType,
		orderType,
		outputType
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h24.onSubmit,
			h24.onSubmitError
		)
	}, [h24.onSubmit, h24.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h24.onDebugSubmit,
		)
	}, [h24.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H24Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H24FormContainer.displayName = "H24FormContainer";



