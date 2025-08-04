import { FormProvider, useFormContext } from "react-hook-form";
import P56Form from "./P56Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P56Context } from "./P56Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P56FormContainer = () => {
	const form = useFormContext();
	const p56 = useContext(P56Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCtAreaID,
		ECtAreaID,
		SCityID,
		ECityID,
		STrvID,
		ETrvID,
		reportType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p56.onSubmit,
			p56.onSubmitError
		)
	}, [p56.onSubmit, p56.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p56.onDebugSubmit,
		)
	}, [p56.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P56Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P56FormContainer.displayName = "P56FormContainer";








