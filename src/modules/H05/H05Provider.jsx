import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H05Context } from "./H05Context";
import H05ReportType from "./pickers/H05ReportType.mjs";
import { useH05 } from "./useH05";

export const H05Provider = ({ children }) => {
	const h05 = useH05();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SCustID: null,
			ECustID: null,
			InclTest: false,
			reportType: H05ReportType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H05Context.Provider
				value={{
					...h05,
					handleSubmit: form.handleSubmit(
						h05.onSubmit,
						h05.onSubmitError
					),
				}}>
				{children}
			</H05Context.Provider>
		</FormProvider>
	);
};

H05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






