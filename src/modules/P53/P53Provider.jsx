import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P53Context } from "./P53Context";
import P53ReportType from "./pickers/P53ReportType.mjs";
import { useP53 } from "./useP53";

export const P53Provider = ({ children }) => {
	const p53 = useP53();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			reportType: P53ReportType.getDefaultOption(),
			CondName: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P53Context.Provider
				value={{
					...p53,
					handleSubmit: form.handleSubmit(
						p53.onSubmit,
						p53.onSubmitError
					),
				}}>
				{children}
			</P53Context.Provider>
		</FormProvider>
	);
};

P53Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




