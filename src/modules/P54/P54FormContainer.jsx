import { FormProvider, useFormContext } from "react-hook-form";
import P54Form from "./P54Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P54Context } from "./P54Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P54FormContainer = () => {
	const form = useFormContext();
	const p54 = useContext(P54Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		AsType,
		STrvID,
		ETrvID,
		SCarID,
		ECarID,
		SCndID,
		ECndID,
		ChkAmt,
		reportType,
		DtlType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p54.onSubmit,
			p54.onSubmitError
		)
	}, [p54.onSubmit, p54.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p54.onDebugSubmit,
		)
	}, [p54.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P54Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P54FormContainer.displayName = "P54FormContainer";








