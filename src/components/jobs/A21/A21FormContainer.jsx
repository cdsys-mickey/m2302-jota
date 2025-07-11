import { A21Context } from "@/contexts/A21/A21Context";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A21Form from "./A21Form";

export const A21FormContainer = () => {
	const a21 = useContext(A21Context);
	const form = useFormContext();

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a21.onDebugSubmit,
		)
	}, [a21.onDebugSubmit, form]);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a21.onSubmit,
			a21.onSubmitError
		)
	}, [a21.onSubmit, a21.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		// <FormProvider {...form}>
		<FormMetaProvider {...a21.formMeta}>
			<A21Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
		// </FormProvider>
	);

};

A21FormContainer.displayName = "A21FormContainer";
