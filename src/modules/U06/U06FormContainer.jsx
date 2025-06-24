import { FormProvider, useFormContext } from "react-hook-form";
import U06Form from "./U06Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { U06Context } from "./U06Context";
import { useHotkeys } from "react-hotkeys-hook";

export const U06FormContainer = () => {
	const form = useFormContext();
	const u06 = useContext(U06Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onSubmit,
			u06.onSubmitError
		)
	}, [u06.onSubmit, u06.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onDebugSubmit,
		)
	}, [u06.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u06.formMeta}>
			<U06Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U06FormContainer.displayName = "U06FormContainer";



