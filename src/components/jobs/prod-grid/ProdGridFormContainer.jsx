import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useContext } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ProdGridForm from "./ProdGridForm";
import useDebounce from "../../../shared-hooks/useDebounce";
import { useEffect } from "react";

export const ProdGridFormContainer = (props) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const prodGrid = useContext(ProdGridContext);

	// const { control } = form;
	// const criteria = useWatch({ control });
	// const debouncedValues = useDebounce(criteria, 300);
	// useEffect(() => {
	// 	console.log("criteria changed", debouncedValues);
	// 	// peek(debouncedValues);
	// }, [debouncedValues]);

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
