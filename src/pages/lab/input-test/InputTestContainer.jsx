import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputTest from "./InputTest";
import { InputTestContext } from "./InputTestContext";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const InputTestContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();
	const inputTest = useContext(InputTestContext);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...inputTest.formMeta}>
				<InputTest {...rest} />
			</FormMetaProvider>
		</FormProvider>
	);
};

InputTestContainer.displayName = "OptionPickerTestContainer";
