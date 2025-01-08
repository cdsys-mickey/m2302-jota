import { FormProvider, useFormContext } from "react-hook-form";
import P04Form from "./P04Form";
import { P04Context } from "@/contexts/P04/P04Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const P04FormContainer = () => {
	const form = useFormContext();
	const p04 = useContext(P04Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			p04.onSubmit,
			p04.onSubmitError
		)
	}, [p04.onSubmit, p04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p04.onDebugSubmit,
		)
	}, [p04.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...p04.formMeta}>
			<P04Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P04FormContainer.displayName = "P04FormContainer";


