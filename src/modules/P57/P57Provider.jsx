import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P57Context } from "./P57Context";
import P57ReportType from "./pickers/P57ReportTypes.mjs";
import { useP57 } from "./useP57";

export const P57Provider = ({ children }) => {
	const p57 = useP57();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCtAreaID: null,
			ECtAreaID: null,
			SCityID: null,
			ECityID: null,
			SCarID: null,
			ECarID: null,
			SCustTID: null,
			ECustTID: null,
			reportType: P57ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P57Context.Provider
				value={{
					...p57,
					handleSubmit: form.handleSubmit(
						p57.onSubmit,
						p57.onSubmitError
					),
				}}>
				{children}
			</P57Context.Provider>
		</FormProvider>
	);
};

P57Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








