import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H36Context } from "./H36Context";
import H36Form from "./H36Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H36FormContainer = () => {
	const form = useFormContext();
	const h36 = useContext(H36Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		reportType,
		orderType,
		outputType,
		`
	)

	const reportType = useWatch({
		name: "reportType",
		control: form.control
	})

	const orderTypeDisabled = useMemo(() => {
		return reportType?.id == 1;
	}, [reportType?.id])

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h36.onSubmit,
			h36.onSubmitError
		)
	}, [h36.onSubmit, h36.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h36.onDebugSubmit,
		)
	}, [h36.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H36Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} orderTypeDisabled={orderTypeDisabled} />
		</FormMetaProvider>
	</FormProvider>;
};

H36FormContainer.displayName = "H36FormContainer";



