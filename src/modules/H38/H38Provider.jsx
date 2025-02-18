import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../md-std-print";
import { H38Context } from "./H38Context";
import H38OrderType from "./pickers/H38OrderType.mjs";
import { useH38 } from "./useH38";

export const H38Provider = ({ children }) => {
	const h38 = useH38();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			EPDlineID: null,
			orderType: H38OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H38Context.Provider
				value={{
					...h38,
					handleSubmit: form.handleSubmit(
						h38.onSubmit,
						h38.onSubmitError
					),
				}}>
				{children}
			</H38Context.Provider>
		</FormProvider>
	);
};

H38Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




