import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H26Context } from "./H26Context";
import H26Form from "./H26Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H26FormContainer = () => {
	const form = useFormContext();
	const h26 = useContext(H26Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			SArrDate,
			EArrDate,
			SProdID,
			EProdID,
			SDeptID,
			EDeptID,
			reportType,
			orderType,
			outputType
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h26.onSubmit,
			h26.onSubmitError
		)
	}, [h26.onSubmit, h26.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h26.onDebugSubmit,
		)
	}, [h26.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H26Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H26FormContainer.displayName = "H26FormContainer";







