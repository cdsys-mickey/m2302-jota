import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "@/modules/StdPrint.mjs";
import { U07Context } from "./U07Context";
import U07DataType from "./picker/U07DataType.mjs";
import { useU07 } from "./useU07";

export const U07Provider = ({ children }) => {
	const u07 = useU07();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U07DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U07Context.Provider
				value={{
					...u07,
					handleSubmit: form.handleSubmit(
						u07.onSubmit,
						u07.onSubmitError
					),
				}}>
				{children}
			</U07Context.Provider>
		</FormProvider>
	);
};

U07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





