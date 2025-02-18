import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H35Context } from "./H35Context";
import H35Form from "./H35Form";

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

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h35.onSubmit,
			h35.onSubmitError
		)
	}, [h35.onSubmit, h35.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h35.onDebugSubmit,
		)
	}, [h35.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H35Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H35FormContainer.displayName = "H35FormContainer";









