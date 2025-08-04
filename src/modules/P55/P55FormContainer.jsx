import { FormProvider, useFormContext } from "react-hook-form";
import P55Form from "./P55Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P55Context } from "./P55Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P55FormContainer = () => {
	const form = useFormContext();
	const p55 = useContext(P55Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCtAreaID,
		ECtAreaID,
		SCityID,
		ECityID,
		SCustTID,
		ECustTID,
		reportType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p55.onSubmit,
			p55.onSubmitError
		)
	}, [p55.onSubmit, p55.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p55.onDebugSubmit,
		)
	}, [p55.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P55Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P55FormContainer.displayName = "P55FormContainer";








