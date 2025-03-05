import { FormProvider, useFormContext } from "react-hook-form";
import U05Form from "./U05Form";
import { U05Context } from "@/modules/U05/U05Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const U05FormContainer = () => {
	const form = useFormContext();
	const u05 = useContext(U05Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u05.onSubmit,
			u05.onSubmitError
		)
	}, [u05.onSubmit, u05.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u05.onDebugSubmit,
		)
	}, [u05.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u05.formMeta}>
			<U05Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U05FormContainer.displayName = "U05FormContainer";


