import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P55Context } from "./P55Context";
import P55ReportType from "./pickers/P55ReportTypes.mjs";
import { useP55 } from "./useP55";

export const P55Provider = ({ children }) => {
	const p55 = useP55();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCtAreaID: null,
			ECtAreaID: null,
			SCityID: null,
			ECityID: null,
			SCustTID: null,
			ECustTID: null,
			reportType: P55ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P55Context.Provider
				value={{
					...p55,
					handleSubmit: form.handleSubmit(
						p55.onSubmit,
						p55.onSubmitError
					),
				}}>
				{children}
			</P55Context.Provider>
		</FormProvider>
	);
};

P55Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








