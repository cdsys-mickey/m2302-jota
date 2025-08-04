import { FormProvider, useFormContext } from "react-hook-form";
import P63Form from "./P63Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P63Context } from "./P63Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P63FormContainer = () => {
	const form = useFormContext();
	const p63 = useContext(P63Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SCndID,
		ECndID,
		ChkAmt,
		reportType,
		DtlType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p63.onSubmit,
			p63.onSubmitError
		)
	}, [p63.onSubmit, p63.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p63.onDebugSubmit,
		)
	}, [p63.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P63Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P63FormContainer.displayName = "P63FormContainer";









