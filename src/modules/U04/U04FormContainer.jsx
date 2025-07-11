import { FormProvider, useFormContext } from "react-hook-form";
import U04Form from "./U04Form";
import { U04Context } from "@/modules/U04/U04Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { useHotkeys } from "react-hotkeys-hook";

export const U04FormContainer = () => {
	const form = useFormContext();
	const u04 = useContext(U04Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u04.onSubmit,
			u04.onSubmitError
		)
	}, [u04.onSubmit, u04.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u04.onDebugSubmit,
		)
	}, [u04.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u04.formMeta}>
			<U04Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U04FormContainer.displayName = "U04FormContainer";



