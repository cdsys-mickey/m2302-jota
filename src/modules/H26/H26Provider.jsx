import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H26Context } from "./H26Context";
import { useH26 } from "./useH26";
import H26ReportType from "./pickers/H26ReportType.mjs";
import H26OrderType from "./pickers/H26OrderType.mjs";

export const H26Provider = ({ children }) => {
	const h26 = useH26();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SArrDate: null,
			EArrDate: null,
			reportType: H26ReportType.getDefaultOption(),
			orderType: H26OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H26Context.Provider
				value={{
					...h26,
					handleSubmit: form.handleSubmit(
						h26.onSubmit,
						h26.onSubmitError
					),
				}}>
				{children}
			</H26Context.Provider>
		</FormProvider>
	);
};

H26Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







