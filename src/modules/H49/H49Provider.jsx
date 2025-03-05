import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { H49Context } from "./H49Context";
import H49ReportType from "./pickers/H49ReportType.mjs";
import { useH49 } from "./useH49";

export const H49Provider = ({ children }) => {
	const h49 = useH49();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			EPDlineID: null,
			reportType: H49ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H49Context.Provider
				value={{
					...h49,
					handleSubmit: form.handleSubmit(
						h49.onSubmit,
						h49.onSubmitError
					),
				}}>
				{children}
			</H49Context.Provider>
		</FormProvider>
	);
};

H49Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





