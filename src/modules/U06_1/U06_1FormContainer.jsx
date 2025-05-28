import { FormProvider, useFormContext } from "react-hook-form";
import U06_1Form from "./U06_1Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { U06_1Context } from "./U06_1Context";
import { useHotkeys } from "react-hotkeys-hook";

export const U06_1FormContainer = () => {
	const form = useFormContext();
	const u061 = useContext(U06_1Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u061.onSubmit,
			u061.onSubmitError
		)
	}, [u061.onSubmit, u061.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u061.onDebugSubmit,
		)
	}, [u061.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u061.formMeta}>
			<U06_1Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U06_1FormContainer.displayName = "U061FormContainer";




