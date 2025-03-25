import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H34Context } from "./H34Context";
import { useH34 } from "./useH34";
import H34ReportType from "./pickers/H34ReportType.mjs";
import H34OrderType from "./pickers/H34OrderType.mjs";

export const H34Provider = ({ children }) => {
	const h34 = useH34();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SDeptID: null,
			EDeptID: null,
			SIDeptID: null,
			EIDeptID: null,
			reportType: H34ReportType.getDefaultOption(),
			orderType: H34OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H34Context.Provider
				value={{
					...h34,
					handleSubmit: form.handleSubmit(
						h34.onSubmit,
						h34.onSubmitError
					),
				}}>
				{children}
			</H34Context.Provider>
		</FormProvider>
	);
};

H34Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







