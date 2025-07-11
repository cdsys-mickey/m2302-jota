import { FormProvider, useFormContext } from "react-hook-form";
import A19Form from "./A19Form";
import { A19Context } from "@/contexts/A19/A19Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { useHotkeys } from "react-hotkeys-hook";
import { useInit } from "@/shared-hooks/useInit";

export const A19FormContainer = () => {
	const form = useFormContext();
	const a19 = useContext(A19Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a19.onSubmit,
			a19.onSubmitError
		)
	}, [a19.onSubmit, a19.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a19.onDebugSubmit,
		)
	}, [a19.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormMetaProvider {...a19.formMeta}>
			<A19Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	)
};

A19FormContainer.displayName = "A19FormContainer";
