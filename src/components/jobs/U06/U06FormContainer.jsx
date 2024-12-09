import { FormProvider, useFormContext } from "react-hook-form";
import U06Form from "./U06Form";
import { U06Context } from "@/contexts/U06/U06Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const U06FormContainer = () => {
	const form = useFormContext();
	const u06 = useContext(U06Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onSubmit,
			u06.onSubmitError
		)
	}, [u06.onSubmit, u06.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onDebugSubmit,
		)
	}, [u06.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u06.formMeta}>
			<U06Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U06FormContainer.displayName = "U06FormContainer";



