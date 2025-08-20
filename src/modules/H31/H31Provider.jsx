import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH31 } from "./useH31";
import StdPrint from "../StdPrint.mjs";
import { H31Context } from "./H31Context";
import H31OrderType from "./pickers/H31OrderType.mjs";

export const H31Provider = ({ children }) => {
	const h31 = useH31();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SFactID: null,
			EFactID: null,
			orderType: H31OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H31Context.Provider
				value={{
					...h31,
					handleSubmit: form.handleSubmit(
						h31.onSubmit,
						h31.onSubmitError
					),
				}}>
				{children}
			</H31Context.Provider>
		</FormProvider>
	);
};

H31Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




