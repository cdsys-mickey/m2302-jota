import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH45 } from "./useH45";
import StdPrint from "../StdPrint.mjs";
import { H45Context } from "./H45Context";
import H45ReportType from "./pickers/H45ReportType.mjs";
import H45OrderType from "./pickers/H45OrderType.mjs";

export const H45Provider = ({ children }) => {
	const h45 = useH45();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			EPDlineID: null,
			RsnID: null,
			reportType: H45ReportType.getDefaultOption(),
			orderType: H45OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H45Context.Provider
				value={{
					...h45,
					handleSubmit: form.handleSubmit(
						h45.onSubmit,
						h45.onSubmitError
					),
				}}>
				{children}
			</H45Context.Provider>
		</FormProvider>
	);
};

H45Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




