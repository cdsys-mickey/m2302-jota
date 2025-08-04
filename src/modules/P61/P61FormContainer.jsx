import { FormProvider, useFormContext } from "react-hook-form";
import P61Form from "./P61Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P61Context } from "./P61Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P61FormContainer = () => {
	const form = useFormContext();
	const p61 = useContext(P61Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		STrvID,
		ETrvID,
		ChkAmt,
		RptClass,
		reportType,
		DtlType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p61.onSubmit,
			p61.onSubmitError
		)
	}, [p61.onSubmit, p61.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p61.onDebugSubmit,
		)
	}, [p61.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P61Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P61FormContainer.displayName = "P61FormContainer";








