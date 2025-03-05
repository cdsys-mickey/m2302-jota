import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import U05_1DataType from "./picker/U05_1DataType.mjs";
import { U05_1Context } from "./U05_1Context";
import { useU05_1 } from "./useU05_1";

export const U05_1Provider = ({ children }) => {
	const u051 = useU05_1();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDate: new Date(),
			EDate: new Date(),
			RptType: U05_1DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U05_1Context.Provider
				value={{
					...u051,
					handleSubmit: form.handleSubmit(
						u051.onSubmit,
						u051.onSubmitError
					),
				}}>
				{children}
			</U05_1Context.Provider>
		</FormProvider>
	);
};

U05_1Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




