import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../../modules/md-std-print";
import { H52Context } from "./H52Context";
import H52ReportType from "./pickers/H52ReportType.mjs";
import { useH52 } from "./useH52";

export const H52Provider = ({ children }) => {
	const h52 = useH52();
	const form = useForm({
		defaultValues: {
			SArrDate: null,
			EArrDate: null,
			SProdID: null,
			EProdID: null,
			reportType: H52ReportType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H52Context.Provider
				value={{
					...h52,
					handleSubmit: form.handleSubmit(
						h52.onSubmit,
						h52.onSubmitError
					),
				}}>
				{children}
			</H52Context.Provider>
		</FormProvider>
	);
};

H52Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





