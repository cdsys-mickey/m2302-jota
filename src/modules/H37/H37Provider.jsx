import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { H37Context } from "./H37Context";
import H37OrderType from "./pickers/H37OrderType.mjs";
import { useH37 } from "./useH37";

export const H37Provider = ({ children }) => {
	const h37 = useH37();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			ELineID: null,
			orderType: H37OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H37Context.Provider
				value={{
					...h37,
					handleSubmit: form.handleSubmit(
						h37.onSubmit,
						h37.onSubmitError
					),
				}}>
				{children}
			</H37Context.Provider>
		</FormProvider>
	);
};

H37Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




