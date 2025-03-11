import { FormProvider, useFormContext } from "react-hook-form";
import U08Form from "./U08Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { U08Context } from "./U08Context";

export const U08FormContainer = () => {
	const form = useFormContext();
	const u08 = useContext(U08Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u08.onSubmit,
			u08.onSubmitError
		)
	}, [u08.onSubmit, u08.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u08.onDebugSubmit,
		)
	}, [u08.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u08.formMeta}>
			<U08Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U08FormContainer.displayName = "U08FormContainer";




