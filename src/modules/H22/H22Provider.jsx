import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H22Context } from "./H22Context";
import H22OrderType from "./pickers/H22OrderType.mjs";
import { useH22 } from "./useH22";
import OrderDir from "../OrderDir.mjs";

export const H22Provider = ({ children }) => {
	const h22 = useH22();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTest: false,
			// reportType: H22ReportType.getDefaultOption(),
			orderType: H22OrderType.getDefaultOption(),
			orderDir: OrderDir.getDefaultOption(),
			// calType: H22CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H22Context.Provider
				value={{
					...h22,
					handleSubmit: form.handleSubmit(
						h22.onSubmit,
						h22.onSubmitError
					),
				}}>
				{children}
			</H22Context.Provider>
		</FormProvider>
	);
};

H22Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






