import { FormProvider, useFormContext } from "react-hook-form";
import U06_1Form from "./U06_1Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { U06_1Context } from "./U06_1Context";

export const U06_1FormContainer = () => {
	const form = useFormContext();
	const u061 = useContext(U06_1Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u061.onSubmit,
			u061.onSubmitError
		)
	}, [u061.onSubmit, u061.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u061.onDebugSubmit,
		)
	}, [u061.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u061.formMeta}>
			<U06_1Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U06_1FormContainer.displayName = "U061FormContainer";




