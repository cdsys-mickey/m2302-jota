import { FormProvider, useFormContext } from "react-hook-form";
import U07Form from "./U07Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { U07Context } from "./U07Context";

export const U07FormContainer = () => {
	const form = useFormContext();
	const u07 = useContext(U07Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			u07.onSubmit,
			u07.onSubmitError
		)
	}, [u07.onSubmit, u07.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u07.onDebugSubmit,
		)
	}, [u07.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...u07.formMeta}>
			<U07Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U07FormContainer.displayName = "U07FormContainer";




