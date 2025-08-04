import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P61Context } from "./P61Context";
import P61ReportType from "./pickers/P61ReportTypes.mjs";
import { useP61 } from "./useP61";
import P61OrderType from "./pickers/P61OrderType.mjs";
import P61RptClasses from "./pickers/P61RptClasses.mjs";

export const P61Provider = ({ children }) => {
	const p61 = useP61();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			STrvID: null,
			ETrvID: null,
			ChkAmt: "",
			RptClass: P61RptClasses.getDefaultOption(),
			reportType: P61ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			DtlType: P61OrderType.getDefaultOption()
		},
	});

	return (
		<FormProvider {...form}>
			<P61Context.Provider
				value={{
					...p61,
					handleSubmit: form.handleSubmit(
						p61.onSubmit,
						p61.onSubmitError
					),
				}}>
				{children}
			</P61Context.Provider>
		</FormProvider>
	);
};

P61Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








