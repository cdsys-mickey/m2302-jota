import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H14_1Context } from "./H14_1Context";
import { useH14_1 } from "./useH14_1";
import H14_1OrderType from "./pickers/H14_1OrderType.mjs";
import H14_1ReportType from "./pickers/H14_1ReportType.mjs";

export const H14_1Provider = ({ children }) => {
	const h141 = useH14_1();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SalType: false,
			SCustID: null,
			ECustID: null,
			reportType: H14_1ReportType.getDefaultOption(),
			orderType: H14_1OrderType.getDefaultOption(),
			SType: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H14_1Context.Provider
				value={{
					...h141,
					handleSubmit: form.handleSubmit(
						h141.onSubmit,
						h141.onSubmitError
					),
				}}>
				{children}
			</H14_1Context.Provider>
		</FormProvider>
	);
};

H14_1Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






