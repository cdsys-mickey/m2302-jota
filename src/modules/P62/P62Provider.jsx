import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P62Context } from "./P62Context";
import P62ReportType from "./pickers/P62ReportTypes.mjs";
import { useP62 } from "./useP62";
import P62OrderType from "./pickers/P62OrderTypes.mjs";
import P62RptClasses from "./pickers/P62RptClasses.mjs";

export const P62Provider = ({ children }) => {
	const p62 = useP62();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCarID: null,
			ECarID: null,
			ChkAmt: "",
			reportType: P62ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			DtlType: P62OrderType.getDefaultOption()
		},
	});

	return (
		<FormProvider {...form}>
			<P62Context.Provider
				value={{
					...p62,
					handleSubmit: form.handleSubmit(
						p62.onSubmit,
						p62.onSubmitError
					),
				}}>
				{children}
			</P62Context.Provider>
		</FormProvider>
	);
};

P62Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};









