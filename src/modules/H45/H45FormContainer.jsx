import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { H45Context } from "./H45Context";
import H45Form from "./H45Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H45FormContainer = () => {
	const form = useFormContext();
	const h45 = useContext(H45Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		RsnID,
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
			h45.onSubmit,
			h45.onSubmitError
		)
	}, [h45.onSubmit, h45.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h45.onDebugSubmit,
		)
	}, [h45.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H45Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} orderTypeDisabled={orderTypeDisabled} />
		</FormMetaProvider>
	</FormProvider>;
};

H45FormContainer.displayName = "H45FormContainer";




