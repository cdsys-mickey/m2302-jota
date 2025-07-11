import { A22Context } from "@/contexts/A22/A22Context";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import A22GridForm from "./A22GridForm";

export const A22GridFormContainer = (props) => {
	const { ...rest } = props;

	const a22 = useContext(A22Context);
	const form = useFormContext();

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a22.onSubmit,
			a22.onSubmitError
		)
	}, [a22.onSubmit, a22.onSubmitError, form]);

	return (
		// <FormProvider {...form}>
		<FormMetaProvider {...a22.formMeta}>
			<A22GridForm
				onSubmit={handleSubmit}
				{...rest}
			/>
		</FormMetaProvider>
		// </FormProvider>
	);
};

A22GridFormContainer.displayName = "A22GridFormContainer";
