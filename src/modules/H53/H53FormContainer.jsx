import { FormProvider, useFormContext } from "react-hook-form";
import H53Form from "./H53Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H53Context } from "./H53Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H53FormContainer = () => {
	const form = useFormContext();
	const h53 = useContext(H53Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SPDlineID,
		EPDlineID,
		orderType,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h53.onSubmit,
			h53.onSubmitError
		)
	}, [h53.onSubmit, h53.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h53.onDebugSubmit,
		)
	}, [h53.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H53Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H53FormContainer.displayName = "H53FormContainer";






