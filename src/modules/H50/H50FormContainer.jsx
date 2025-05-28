import { FormProvider, useFormContext } from "react-hook-form";
import H50Form from "./H50Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H50Context } from "./H50Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const H50FormContainer = () => {
	const form = useFormContext();
	const h50 = useContext(H50Context);

	const formMeta = useFormMeta(
		`
		SDate,
		EDate,
		SProdID,
		EProdID,
		SDeptID,
		EDeptID,
		orderType,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h50.onSubmit,
			h50.onSubmitError
		)
	}, [h50.onSubmit, h50.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h50.onDebugSubmit,
		)
	}, [h50.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<H50Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H50FormContainer.displayName = "H50FormContainer";




