import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "@/modules/StdPrint.mjs";
import { U06Context } from "./U06Context";
import U06DataType from "./picker/U06DataType.mjs";
import { useU06 } from "./useU06";

export const U06Provider = ({ children }) => {
	const u06 = useU06();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U06DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U06Context.Provider
				value={{
					...u06,
					handleSubmit: form.handleSubmit(
						u06.onSubmit,
						u06.onSubmitError
					),
				}}>
				{children}
			</U06Context.Provider>
		</FormProvider>
	);
};

U06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




