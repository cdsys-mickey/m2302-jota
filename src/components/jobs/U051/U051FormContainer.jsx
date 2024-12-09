import { FormProvider, useFormContext } from "react-hook-form";
import U051Form from "./U051Form";
import { U051Context } from "@/contexts/U051/U051Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const U051FormContainer = () => {
	const form = useFormContext();
	const u051 = useContext(U051Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u051.onSubmit,
			u051.onSubmitError
		)
	}, [u051.onSubmit, u051.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u051.onDebugSubmit,
		)
	}, [u051.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u051.formMeta}>
			<U051Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U051FormContainer.displayName = "U051FormContainer";



