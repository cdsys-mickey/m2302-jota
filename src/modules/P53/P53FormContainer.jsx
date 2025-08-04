import { FormProvider, useFormContext } from "react-hook-form";
import P53Form from "./P53Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P53Context } from "./P53Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P53FormContainer = () => {
	const form = useFormContext();
	const p53 = useContext(P53Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		reportType,
		CondName,
		SCond,
		ECond,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p53.onSubmit,
			p53.onSubmitError
		)
	}, [p53.onSubmit, p53.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p53.onDebugSubmit,
		)
	}, [p53.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P53Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P53FormContainer.displayName = "P53FormContainer";




