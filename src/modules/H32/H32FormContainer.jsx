import { FormProvider, useFormContext } from "react-hook-form";
import H32Form from "./H32Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H32Context } from "./H32Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H32FormContainer = () => {
	const form = useFormContext();
	const h32 = useContext(H32Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SFactID,
			EFactID,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h32.onSubmit,
			h32.onSubmitError
		)
	}, [h32.onSubmit, h32.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h32.onDebugSubmit,
		)
	}, [h32.onDebugSubmit, form]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<H32Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H32FormContainer.displayName = "H32FormContainer";




