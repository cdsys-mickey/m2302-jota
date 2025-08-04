import { FormProvider, useFormContext } from "react-hook-form";
import P52Form from "./P52Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P52Context } from "./P52Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P52FormContainer = () => {
	const form = useFormContext();
	const p52 = useContext(P52Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SComID,
		EComID,
		CarID,
		TrvID,
		CndID,
		CmsAmt,
		CmsType,
		reportType,
		Sign,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p52.onSubmit,
			p52.onSubmitError
		)
	}, [p52.onSubmit, p52.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p52.onDebugSubmit,
		)
	}, [p52.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P52Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P52FormContainer.displayName = "P52FormContainer";







