import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputTest from "./InputTest";
import { InputTestContext } from "./InputTestContext";
import { FormManagerProvider } from "@/shared-contexts/form-manager/FormManagerProvider";

export const InputTestContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();
	const inputTest = useContext(InputTestContext);

	return (
		<FormProvider {...form}>
			<FormManagerProvider {...inputTest.formManager}>
				<InputTest {...rest} />
			</FormManagerProvider>
		</FormProvider>
	);
};

InputTestContainer.displayName = "OptionPickerTestContainer";
