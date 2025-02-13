import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH24 } from "./useH24";
import StdPrint from "../../modules/md-std-print";
import { H24Context } from "./H24Context";
import H24ReportType from "./pickers/H24ReportType.mjs";
import H24OrderType from "./pickers/H24OrderType.mjs";

export const H24Provider = ({ children }) => {
	const h24 = useH24();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,

			SProdID: null,
			EProdID: null,
			SDeptID: null,
			EDeptID: null,
			SLineID: null,
			ELineID: null,
			reportType: H24ReportType.getDefaultOption(),
			orderType: H24OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H24Context.Provider
				value={{
					...h24,
					handleSubmit: form.handleSubmit(
						h24.onSubmit,
						h24.onSubmitError
					),
				}}>
				{children}
			</H24Context.Provider>
		</FormProvider>
	);
};

H24Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



