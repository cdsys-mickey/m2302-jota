import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P52Context } from "./P52Context";
import P52ReportType from "./pickers/P52ReportTypes.mjs";
import { useP52 } from "./useP52";

export const P52Provider = ({ children }) => {
	const p52 = useP52();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SComID: null,
			EComID: null,
			CarID: null,
			TrvID: null,
			CndID: null,
			CmsAmt: "",
			CmsType: null,
			reportType: P52ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			Sign: false
		},
	});

	return (
		<FormProvider {...form}>
			<P52Context.Provider
				value={{
					...p52,
					handleSubmit: form.handleSubmit(
						p52.onSubmit,
						p52.onSubmitError
					),
				}}>
				{children}
			</P52Context.Provider>
		</FormProvider>
	);
};

P52Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







