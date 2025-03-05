import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { H46Context } from "./H46Context";
import H46ReportType from "./pickers/H46ReportType.mjs";
import { useH46 } from "./useH46";

export const H46Provider = ({ children }) => {
	const h46 = useH46();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SDeptID: null,
			EDeptID: null,
			RsnID: null,
			reportType: H46ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H46Context.Provider
				value={{
					...h46,
					handleSubmit: form.handleSubmit(
						h46.onSubmit,
						h46.onSubmitError
					),
				}}>
				{children}
			</H46Context.Provider>
		</FormProvider>
	);
};

H46Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





