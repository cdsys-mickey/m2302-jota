import { FormProvider, useFormContext } from "react-hook-form";
import P58Form from "./P58Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P58Context } from "./P58Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P58FormContainer = () => {
	const form = useFormContext();
	const p58 = useContext(P58Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCityID,
		ECityID,
		SCndID,
		ECndID,
		reportType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p58.onSubmit,
			p58.onSubmitError
		)
	}, [p58.onSubmit, p58.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p58.onDebugSubmit,
		)
	}, [p58.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P58Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P58FormContainer.displayName = "P58FormContainer";








