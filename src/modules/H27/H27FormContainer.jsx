import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H27Context } from "./H27Context";
import H27Form from "./H27Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H27FormContainer = () => {
	const form = useFormContext();
	const h27 = useContext(H27Context);

	const formMeta = useFormMeta(
		`
			SArrDate,
			EArrDate,
			SDeptID,
			EDeptID,
			orderType,
			outputType
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h27.onSubmit,
			h27.onSubmitError
		)
	}, [h27.onSubmit, h27.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h27.onDebugSubmit,
		)
	}, [h27.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H27Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H27FormContainer.displayName = "H27FormContainer";







