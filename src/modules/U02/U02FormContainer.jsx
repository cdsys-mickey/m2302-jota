import { FormProvider, useFormContext } from "react-hook-form";
import U02Form from "./U02Form";
import { U02Context } from "@/modules/U02/U02Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useHotkeys } from "react-hotkeys-hook";

export const U02FormContainer = () => {
	const form = useFormContext();
	const u02 = useContext(U02Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u02.onSubmit,
			u02.onSubmitError
		)
	}, [u02.onSubmit, u02.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u02.onDebugSubmit,
		)
	}, [u02.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u02.formMeta}>
			<U02Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U02FormContainer.displayName = "U02FormContainer";



