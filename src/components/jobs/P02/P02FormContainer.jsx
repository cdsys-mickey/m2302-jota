import { FormProvider, useFormContext } from "react-hook-form";
import P02Form from "./P02Form";
import { P02Context } from "@/contexts/P02/P02Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const P02FormContainer = () => {
	const form = useFormContext();
	const p02 = useContext(P02Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			p02.onSubmit,
			p02.onSubmitError
		)
	}, [p02.onSubmit, p02.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p02.onDebugSubmit,
		)
	}, [p02.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...p02.formMeta}>
			<P02Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P02FormContainer.displayName = "P02FormContainer";

