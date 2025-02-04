import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H141Context } from "./H141Context";
import { useH141 } from "./useH141";
import H141OrderType from "./pickers/H141OrderType.mjs";
import H141ReportType from "./pickers/H141ReportType.mjs";

export const H141Provider = ({ children }) => {
	const h141 = useH141();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SalType: false,
			reportType: H141ReportType.getDefaultOption(),
			orderType: H141OrderType.getDefaultOption(),
			// orderDir: OrderDir.getDefaultOption(),
			// calType: H141CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H141Context.Provider
				value={{
					...h141,
					handleSubmit: form.handleSubmit(
						h141.onSubmit,
						h141.onSubmitError
					),
				}}>
				{children}
			</H141Context.Provider>
		</FormProvider>
	);
};

H141Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






