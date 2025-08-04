import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P54Context } from "./P54Context";
import P54ReportType from "./pickers/P54ReportTypes.mjs";
import { useP54 } from "./useP54";
import P54OrderTypes from "./pickers/P54OrderTypes.mjs";

export const P54Provider = ({ children }) => {
	const p54 = useP54();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			AsType: null,
			STrvID: null,
			ETrvID: null,
			SCarID: null,
			ECarID: null,
			SCndID: null,
			ECndID: null,
			ChkAmt: "",
			reportType: P54ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			DtlType: P54OrderTypes.getDefaultOption()
		},
	});

	return (
		<FormProvider {...form}>
			<P54Context.Provider
				value={{
					...p54,
					handleSubmit: form.handleSubmit(
						p54.onSubmit,
						p54.onSubmitError
					),
				}}>
				{children}
			</P54Context.Provider>
		</FormProvider>
	);
};

P54Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








