import { FormProvider, useFormContext } from "react-hook-form";
import U061Form from "./U061Form";
import { U061Context } from "@/contexts/U061/U061Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const U061FormContainer = () => {
	const form = useFormContext();
	const u061 = useContext(U061Context);

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
			<U061Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U061FormContainer.displayName = "U061FormContainer";




