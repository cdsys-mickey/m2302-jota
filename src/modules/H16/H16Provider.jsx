import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H16Context } from "./H16Context";
import H16OrderType from "./pickers/H16OrderType.mjs";
import H16ReportType from "./pickers/H16ReportType.mjs";
import { useH16 } from "./useH16";

export const H16Provider = ({ children }) => {
	const h16 = useH16();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SArrDate: null,
			EArrDate: null,
			// InclTest: false,
			reportType: H16ReportType.getDefaultOption(),
			orderType: H16OrderType.getDefaultOption(),
			// orderDir: OrderDir.getDefaultOption(),
			// calType: H16CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H16Context.Provider
				value={{
					...h16,
					handleSubmit: form.handleSubmit(
						h16.onSubmit,
						h16.onSubmitError
					),
				}}>
				{children}
			</H16Context.Provider>
		</FormProvider>
	);
};

H16Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






