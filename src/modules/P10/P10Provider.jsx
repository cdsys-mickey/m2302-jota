import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP10 } from "./useP10";
import StdPrint from "../StdPrint.mjs";
import { P10Context } from "./P10Context";
import P10ReportType from "./pickers/P10ReportTypes.mjs";
import P10OrderType from "./pickers/P10OrderTypes.mjs";
import OrderDirs from "../OrderDirs.mjs";

export const P10Provider = ({ children }) => {
	const p10 = useP10();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			RptType: P10ReportType.getDefaultOption(),
			OrdName: P10OrderType.getDefaultOption(),
			OrdSeq: OrderDirs.getDefaultOption(),
			Top: "",
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P10Context.Provider
				value={{
					...p10,
					handleSubmit: form.handleSubmit(
						p10.onSubmit,
						p10.onSubmitError
					),
				}}>
				{children}
			</P10Context.Provider>
		</FormProvider>
	);
};

P10Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



