import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../../modules/md-std-print";
import { H41Context } from "./H41Context";
import H41ReportType from "./pickers/H41ReportType.mjs";
import { useH41 } from "./useH41";

export const H41Provider = ({ children }) => {
	const h41 = useH41();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SCustID: null,
			ECustID: null,
			SDeptID: null,
			EDeptID: null,
			RsnID: null,
			reportType: H41ReportType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H41Context.Provider
				value={{
					...h41,
					handleSubmit: form.handleSubmit(
						h41.onSubmit,
						h41.onSubmitError
					),
				}}>
				{children}
			</H41Context.Provider>
		</FormProvider>
	);
};

H41Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




