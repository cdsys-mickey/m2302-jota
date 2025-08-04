import { FormProvider, useFormContext } from "react-hook-form";
import P62Form from "./P62Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P62Context } from "./P62Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P62FormContainer = () => {
	const form = useFormContext();
	const p62 = useContext(P62Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCarID,
		ECarID,
		ChkAmt,
		reportType,
		DtlType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p62.onSubmit,
			p62.onSubmitError
		)
	}, [p62.onSubmit, p62.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p62.onDebugSubmit,
		)
	}, [p62.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P62Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P62FormContainer.displayName = "P62FormContainer";









