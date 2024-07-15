import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A22GridForm from "./A22GridForm";
import { A22Context } from "@/contexts/A22/A22Context";

export const A22GridFormContainer = (props) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {
			qty: "1",
		},
	});
	const a22 = useContext(A22Context);

	return (
		<FormProvider {...form}>
			<A22GridForm
				handleSubmit={form.handleSubmit(
					a22.onSubmit,
					a22.onSubmitError
				)}
				{...rest}
			/>
		</FormProvider>
	);
};

A22GridFormContainer.displayName = "A22GridFormContainer";
