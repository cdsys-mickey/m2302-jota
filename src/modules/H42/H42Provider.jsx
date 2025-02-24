import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H42Context } from "./H42Context";
import H42OrderType from "./pickers/H42OrderType.mjs";
import H42ReportType from "./pickers/H42ReportType.mjs";
import { useH42 } from "./useH42";

export const H42Provider = ({ children }) => {
	const h42 = useH42();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SArrDate: null,
			EArrDate: null,
			SProdID: null,
			EProdID: null,
			SDeptID: null,
			EDeptID: null,
			reportType: H42ReportType.getDefaultOption(),
			orderType: H42OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H42Context.Provider
				value={{
					...h42,
					handleSubmit: form.handleSubmit(
						h42.onSubmit,
						h42.onSubmitError
					),
				}}>
				{children}
			</H42Context.Provider>
		</FormProvider>
	);
};

H42Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







