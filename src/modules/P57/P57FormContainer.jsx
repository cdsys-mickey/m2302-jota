import { FormProvider, useFormContext } from "react-hook-form";
import P57Form from "./P57Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P57Context } from "./P57Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P57FormContainer = () => {
	const form = useFormContext();
	const p57 = useContext(P57Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCtAreaID,
		ECtAreaID,
		SCityID,
		ECityID,
		SCarID,
		ECarID,
		SCustTID,
		ECustTID,
		reportType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p57.onSubmit,
			p57.onSubmitError
		)
	}, [p57.onSubmit, p57.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p57.onDebugSubmit,
		)
	}, [p57.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P57Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P57FormContainer.displayName = "P57FormContainer";








