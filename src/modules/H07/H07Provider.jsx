import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H07Context } from "./H07Context";
import H07OrderType from "./pickers/H07OrderType.mjs";
import { useH07 } from "./useH07";
import OrderDirs from "../OrderDirs.mjs";

export const H07Provider = ({ children }) => {
	const h07 = useH07();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTest: false,
			// reportType: H07ReportType.getDefaultOption(),
			orderType: H07OrderType.getDefaultOption(),
			orderDir: OrderDirs.getOptionById(2),
			// calType: H07CalType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
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





