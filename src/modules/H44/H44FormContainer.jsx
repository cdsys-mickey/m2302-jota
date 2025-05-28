import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H44Context } from "./H44Context";
import H44Form from "./H44Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H44FormContainer = () => {
	const form = useFormContext();
	const h44 = useContext(H44Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SProdID,
			EProdID,
			Times,
			Minus,
			orderType,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h44.onSubmit,
			h44.onSubmitError
		)
	}, [h44.onSubmit, h44.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h44.onDebugSubmit,
		)
	}, [h44.onDebugSubmit, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H44Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H44FormContainer.displayName = "H44FormContainer";






