import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH08 } from "./useH08";
import StdPrint from "@/modules/md-std-print";
import { H08Context } from "./H08Context";
import H08ReportType from "./pickers/H08ReportType.mjs";
import H08OrderType from "./pickers/H08OrderType.mjs";
import OrderDir from "../OrderDir.mjs";
import H08CalType from "./pickers/H08CalType.mjs";

export const H08Provider = ({ children }) => {
	const h08 = useH08();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			orderType: H08OrderType.getDefaultOption(),
			orderDir: OrderDir.getOptionById(2),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H08Context.Provider
				value={{
					...h08,
					handleSubmit: form.handleSubmit(
						h08.onSubmit,
						h08.onSubmitError
					),
				}}>
				{children}
			</H08Context.Provider>
		</FormProvider>
	);
};

H08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





