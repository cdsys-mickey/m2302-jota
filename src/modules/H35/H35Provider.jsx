import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H35Context } from "./H35Context";
import { useH35 } from "./useH35";
import H35OrderType from "./pickers/H35OrderType.mjs";
import H35ReportType from "./pickers/H35ReportType.mjs";

export const H35Provider = ({ children }) => {
	const h35 = useH35();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SODeptID: null,
			EODeptID: null,
			reportType: H35ReportType.getDefaultOption(),
			orderType: H35OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H35Context.Provider
				value={{
					...h35,
					handleSubmit: form.handleSubmit(
						h35.onSubmit,
						h35.onSubmitError
					),
				}}>
				{children}
			</H35Context.Provider>
		</FormProvider>
	);
};

H35Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};









