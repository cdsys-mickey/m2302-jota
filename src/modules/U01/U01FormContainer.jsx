import { FormProvider, useFormContext } from "react-hook-form";
import U01Form from "./U01Form";
import { U01Context } from "@/modules/U01/U01Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useHotkeys } from "react-hotkeys-hook";

export const U01FormContainer = () => {
	const form = useFormContext();
	const u01 = useContext(U01Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u01.onSubmit,
			u01.onSubmitError
		)
	}, [u01.onSubmit, u01.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u01.onDebugSubmit,
		)
	}, [u01.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u01.formMeta}>
			<U01Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U01FormContainer.displayName = "U01FormContainer";


