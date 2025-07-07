import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H14_2Context } from "./H14_2Context";
import { useH14_2 } from "./useH14_2";
import H14_2OrderType from "./pickers/H14_2OrderType.mjs";
import H14_2ReportType from "./pickers/H14_2ReportType.mjs";

export const H14_2Provider = ({ children }) => {
	const h141 = useH14_2();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			EPDlineID: null,
			reportType: H14_2ReportType.getDefaultOption(),
			orderType: H14_2OrderType.getDefaultOption(),
			SType: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H14_2Context.Provider
				value={{
					...h141,
					handleSubmit: form.handleSubmit(
						h141.onSubmit,
						h141.onSubmitError
					),
				}}>
				{children}
			</H14_2Context.Provider>
		</FormProvider>
	);
};

H14_2Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







