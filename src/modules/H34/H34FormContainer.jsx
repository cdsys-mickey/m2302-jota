import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H34Context } from "./H34Context";
import H34Form from "./H34Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H34FormContainer = () => {
	const form = useFormContext();
	const h34 = useContext(H34Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SIDeptID,
			EIDeptID,
			reportType,
			orderType,
			outputType
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h34.onSubmit,
			h34.onSubmitError
		)
	}, [h34.onSubmit, h34.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h34.onDebugSubmit,
		)
	}, [h34.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H34Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H34FormContainer.displayName = "H34FormContainer";







