import { FormProvider, useFormContext } from "react-hook-form";
import P22Form from "./P22Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { P22Context } from "./P22Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P22FormContainer = () => {
	const form = useFormContext();
	const p22 = useContext(P22Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p22.onSubmit,
			p22.onSubmitError
		)
	}, [p22.onSubmit, p22.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p22.onDebugSubmit,
		)
	}, [p22.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P22Form
				onDebugSubmit={onDebugSubmit}
				onSubmit={handleSubmit}
			// onSelect={p22.onSelect({ setValue: form.setValue })}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

P22FormContainer.displayName = "P22FormContainer";




