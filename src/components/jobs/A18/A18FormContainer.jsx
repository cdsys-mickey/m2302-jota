import { useMemo } from "react";
import A18Form from "./A18Form";
import { FormProvider, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { A18Context } from "@/contexts/A18/A18Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const A18FormContainer = () => {
	const form = useFormContext();
	const a18 = useContext(A18Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			a18.onSubmit,
			a18.onSubmitError
		)
	}, [a18.onSubmit, a18.onSubmitError, form]);
	return (
		<FormProvider {...form}>
			<FormMetaProvider {...a18.formMeta}>
				<A18Form onSubmit={onSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

A18FormContainer.displayName = "A18FormContainer";
