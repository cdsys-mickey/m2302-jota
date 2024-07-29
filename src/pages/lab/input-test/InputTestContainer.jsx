import { FormProvider, useForm } from "react-hook-form";
import InputTest from "./InputTest";
import { useCallback } from "react";

export const InputTestContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();

	return (
		<FormProvider {...form}>
			<InputTest {...rest} />
		</FormProvider>
	);
};

InputTestContainer.displayName = "OptionPickerTestContainer";
