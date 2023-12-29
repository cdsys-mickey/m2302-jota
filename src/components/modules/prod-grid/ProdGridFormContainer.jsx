import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProdGridForm from "./ProdGridForm";

export const ProdGridFormContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();
	const prodGrid = useContext(ProdGridContext);

	return (
		<FormProvider {...form}>
			<ProdGridForm
				handleSubmit={form.handleSubmit(
					prodGrid.onSubmit,
					prodGrid.onSubmitError
				)}
				{...rest}
			/>
		</FormProvider>
	);
};

ProdGridFormContainer.displayName = "ProdGridFormContainer";
