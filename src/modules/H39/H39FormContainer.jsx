import { FormProvider, useFormContext } from "react-hook-form";
import H39Form from "./H39Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H39Context } from "./H39Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H39FormContainer = () => {
	const form = useFormContext();
	const h39 = useContext(H39Context);

	const formMeta = useFormMeta(
		`
		SProdID,
		EProdID,
		SDate1,
		EDate1,
		SDate2,
		EDate2,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h39.onSubmit,
			h39.onSubmitError
		)
	}, [h39.onSubmit, h39.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h39.onDebugSubmit,
		)
	}, [h39.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H39Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H39FormContainer.displayName = "H39FormContainer";





