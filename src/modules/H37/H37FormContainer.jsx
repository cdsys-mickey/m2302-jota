import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H37Context } from "./H37Context";
import H37Form from "./H37Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H37FormContainer = () => {
	const form = useFormContext();
	const h37 = useContext(H37Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		orderType,
		outputType
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h37.onSubmit,
			h37.onSubmitError
		)
	}, [h37.onSubmit, h37.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h37.onDebugSubmit,
		)
	}, [h37.onDebugSubmit, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H37Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H37FormContainer.displayName = "H37FormContainer";




