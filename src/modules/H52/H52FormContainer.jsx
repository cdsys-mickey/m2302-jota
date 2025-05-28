import { FormProvider, useFormContext } from "react-hook-form";
import H52Form from "./H52Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H52Context } from "./H52Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H52FormContainer = () => {
	const form = useFormContext();
	const h52 = useContext(H52Context);

	const formMeta = useFormMeta(
		`
		SArrDate,
		EArrDate,
		SProdID,
		EProdID,
		reportType,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h52.onSubmit,
			h52.onSubmitError
		)
	}, [h52.onSubmit, h52.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h52.onDebugSubmit,
		)
	}, [h52.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H52Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H52FormContainer.displayName = "H52FormContainer";





