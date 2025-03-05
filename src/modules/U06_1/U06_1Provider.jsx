import StdPrint from "@/modules/StdPrint.mjs";
import { useU06_1 } from "@/modules/U06_1/useU06_1";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { U06_1Context } from "./U06_1Context";
import U06_1DataType from "./picker/U06_1DataType.mjs";

export const U061Provider = ({ children }) => {
	const u061 = useU06_1();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U06_1DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U06_1Context.Provider
				value={{
					...u061,
					handleSubmit: form.handleSubmit(
						u061.onSubmit,
						u061.onSubmitError
					),
				}}>
				{children}
			</U06_1Context.Provider>
		</FormProvider>
	);
};

U061Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





