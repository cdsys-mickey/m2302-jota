import { FormProvider, useForm } from "react-hook-form";
import OptionPickerTest from "./OptionPickerTest";
import { useCallback } from "react";

export const OptionPickerTestContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();

	return (
		<FormProvider {...form}>
			<OptionPickerTest {...rest} />
		</FormProvider>
	);
};

OptionPickerTestContainer.displayName = "OptionPickerTestContainer";
