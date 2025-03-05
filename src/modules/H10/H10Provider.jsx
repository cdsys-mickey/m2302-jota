import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH10 } from "./useH10";
import StdPrint from "@/modules/StdPrint.mjs";
import { H10Context } from "./H10Context";
import H10ReportType from "./pickers/H10ReportType.mjs";
import H10OrderType from "./pickers/H10OrderType.mjs";
import OrderDir from "../OrderDir.mjs";
import H10CalType from "./pickers/H10CalType.mjs";

export const H10Provider = ({ children }) => {
	const h10 = useH10();
	const form = useForm({
		defaultValues: {
			SDate1: null,
			EDate1: null,
			SDate2: null,
			EDate2: null,
			TopNo: 10,
			reportType: H10ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H10Context.Provider
				value={{
					...h10,
					handleSubmit: form.handleSubmit(
						h10.onSubmit,
						h10.onSubmitError
					),
				}}>
				{children}
			</H10Context.Provider>
		</FormProvider>
	);
};

H10Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





