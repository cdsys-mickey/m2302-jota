import { FormProvider, useFormContext } from "react-hook-form";
import U05_1Form from "./U05_1Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { U05_1Context } from "./U05_1Context";
import { useHotkeys } from "react-hotkeys-hook";

export const U05_1FormContainer = () => {
	const form = useFormContext();
	const u051 = useContext(U05_1Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u051.onSubmit,
			u051.onSubmitError
		)
	}, [u051.onSubmit, u051.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u051.onDebugSubmit,
		)
	}, [u051.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u051.formMeta}>
			<U05_1Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U05_1FormContainer.displayName = "U05_1FormContainer";



