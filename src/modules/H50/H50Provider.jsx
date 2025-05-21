import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { H50Context } from "./H50Context";
import H50OrderType from "./pickers/H50OrderType.mjs";
import { useH50 } from "./useH50";

export const H50Provider = ({ children }) => {
	const h50 = useH50();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SDeptID: null,
			EDeptID: null,
			orderType: H50OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H50Context.Provider
				value={{
					...h50,
					handleSubmit: form.handleSubmit(
						h50.onSubmit,
						h50.onSubmitError
					),
				}}>
				{children}
			</H50Context.Provider>
		</FormProvider>
	);
};

H50Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




