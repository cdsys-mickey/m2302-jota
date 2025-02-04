import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H07Context } from "./H07Context";
import H07OrderType from "./pickers/H07OrderType.mjs";
import { useH07 } from "./useH07";
import OrderDir from "../OrderDir.mjs";

export const H07Provider = ({ children }) => {
	const h07 = useH07();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTest: false,
			// reportType: H07ReportType.getDefaultOption(),
			orderType: H07OrderType.getDefaultOption(),
			orderDir: OrderDir.getDefaultOption(),
			// calType: H07CalType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H07Context.Provider
				value={{
					...h07,
					handleSubmit: form.handleSubmit(
						h07.onSubmit,
						h07.onSubmitError
					),
				}}>
				{children}
			</H07Context.Provider>
		</FormProvider>
	);
};

H07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





