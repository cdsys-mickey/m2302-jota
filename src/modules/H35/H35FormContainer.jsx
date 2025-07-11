import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H35Context } from "./H35Context";
import H35Form from "./H35Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H35FormContainer = () => {
	const form = useFormContext();
	const h35 = useContext(H35Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SODeptID,
			EODeptID,
			reportType,
			orderType,
			outputType
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h35.onSubmit,
			h35.onSubmitError
		)
	}, [h35.onSubmit, h35.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h35.onDebugSubmit,
		)
	}, [h35.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H35Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H35FormContainer.displayName = "H35FormContainer";









