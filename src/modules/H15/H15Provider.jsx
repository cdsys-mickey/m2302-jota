import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H15Context } from "./H15Context";
import H15ReportType from "./pickers/H15ReportType.mjs";
import { useH15 } from "./useH15";

export const H15Provider = ({ children }) => {
	const h15 = useH15();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			// InclTest: false,
			reportType: H15ReportType.getDefaultOption(),
			// orderType: H15OrderType.getDefaultOption(),
			// orderDir: OrderDir.getDefaultOption(),
			// calType: H15CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H15Context.Provider
				value={{
					...h15,
					handleSubmit: form.handleSubmit(
						h15.onSubmit,
						h15.onSubmitError
					),
				}}>
				{children}
			</H15Context.Provider>
		</FormProvider>
	);
};

H15Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






