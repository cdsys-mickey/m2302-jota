import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H11Context } from "./H11Context";
import { useH11 } from "./useH11";
import H11ReportType from "./pickers/H11ReportType.mjs";

export const H11Provider = ({ children }) => {
	const h11 = useH11();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			TopNo: 10,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			reportType: H11ReportType.getDefaultOption(),
			numbers: [
				100000,
				50000,
				20000,
				0,
				null,
				null
			]
		},
	});

	return (
		<FormProvider {...form}>
			<H11Context.Provider
				value={{
					...h11,
					handleSubmit: form.handleSubmit(
						h11.onSubmit,
						h11.onSubmitError
					),
				}}>
				{children}
			</H11Context.Provider>
		</FormProvider>
	);
};

H11Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






