import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { H47Context } from "./H47Context";
import H47ReportType from "./pickers/H47ReportType.mjs";
import { useH47 } from "./useH47";

export const H47Provider = ({ children }) => {
	const h47 = useH47();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,

			SProdID: null,
			EProdID: null,
			SDeptID: null,
			EDeptID: null,
			RsnID: null,
			reportType: H47ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H47Context.Provider
				value={{
					...h47,
					handleSubmit: form.handleSubmit(
						h47.onSubmit,
						h47.onSubmitError
					),
				}}>
				{children}
			</H47Context.Provider>
		</FormProvider>
	);
};

H47Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






