import { FormProvider, useForm } from "react-hook-form";
import OptionPickerTest from "./OptionPickerTest";
import { useCallback } from "react";

export const OptionPickerTestContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();

	const findOption = useCallback(({ options, value }) => {
		return options.find((i) => i.TypeA === value);
	}, []);

	return (
		<FormProvider {...form}>
			<OptionPickerTest findOption={findOption} {...rest} />
		</FormProvider>
	);
};

OptionPickerTestContainer.displayName = "OptionPickerTestContainer";
