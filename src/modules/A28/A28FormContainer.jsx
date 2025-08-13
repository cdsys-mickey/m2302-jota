import { FormProvider, useFormContext } from "react-hook-form";
import A28Form from "./A28Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { A28Context } from "./A28Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const A28FormContainer = () => {
	const form = useFormContext();
	const a28 = useContext(A28Context);

	const formMeta = useFormMeta(
		`
		dept,
		SDate,
		EDate,
		LoginName,
		UserName,
		IP,
		Top,
		OrderBy,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a28.onSubmit,
			a28.onSubmitError
		)
	}, [a28.onSubmit, a28.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a28.onDebugSubmit,
		)
	}, [a28.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<A28Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

A28FormContainer.displayName = "A28FormContainer";









