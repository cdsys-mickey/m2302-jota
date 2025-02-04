import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH04 } from "./useH04";
import StdPrint from "@/modules/md-std-print";
import { H04Context } from "./H04Context";
import H04ReportType from "./pickers/H04ReportType.mjs";
import H04OrderType from "./pickers/H04OrderType.mjs";
import OrderDir from "../OrderDir.mjs";
import H04CalType from "./pickers/H04CalType.mjs";

export const H04Provider = ({ children }) => {
	const h04 = useH04();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTest: false,
			reportType: H04ReportType.getDefaultOption(),
			orderType: H04OrderType.getDefaultOption(),
			orderDir: OrderDir.getDefaultOption(),
			calType: H04CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H04Context.Provider
				value={{
					...h04,
					handleSubmit: form.handleSubmit(
						h04.onSubmit,
						h04.onSubmitError
					),
				}}>
				{children}
			</H04Context.Provider>
		</FormProvider>
	);
};

H04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




