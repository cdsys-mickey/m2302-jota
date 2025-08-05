import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P63Context } from "./P63Context";
import P63OrderType from "./pickers/P63OrderTypes.mjs";
import P63ReportType from "./pickers/P63ReportTypes.mjs";
import { useP63 } from "./useP63";

export const P63Provider = ({ children }) => {
	const p63 = useP63();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCndID: null,
			ECndID: null,
			ChkAmt: "",
			reportType: P63ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
			DtlType: P63OrderType.getDefaultOption()
		},
	});

	return (
		<FormProvider {...form}>
			<P63Context.Provider
				value={{
					...p63,
					handleSubmit: form.handleSubmit(
						p63.onSubmit,
						p63.onSubmitError
					),
				}}>
				{children}
			</P63Context.Provider>
		</FormProvider>
	);
};

P63Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};









