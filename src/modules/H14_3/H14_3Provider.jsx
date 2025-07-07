import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H14_3Context } from "./H14_3Context";
import { useH14_3 } from "./useH14_3";
import H14_3OrderType from "./pickers/H14_3OrderType.mjs";
import H14_3ReportType from "./pickers/H14_3ReportType.mjs";

export const H14_3Provider = ({ children }) => {
	const h141 = useH14_3();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			reportType: H14_3ReportType.getDefaultOption(),
			orderType: H14_3OrderType.getDefaultOption(),
			SType: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H14_3Context.Provider
				value={{
					...h141,
					handleSubmit: form.handleSubmit(
						h141.onSubmit,
						h141.onSubmitError
					),
				}}>
				{children}
			</H14_3Context.Provider>
		</FormProvider>
	);
};

H14_3Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







