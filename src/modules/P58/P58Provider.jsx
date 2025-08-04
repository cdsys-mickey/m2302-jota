import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P58Context } from "./P58Context";
import P58ReportType from "./pickers/P58ReportTypes.mjs";
import { useP58 } from "./useP58";

export const P58Provider = ({ children }) => {
	const p58 = useP58();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCityID: null,
			ECityID: null,
			SCndID: null,
			ECndID: null,
			reportType: P58ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P58Context.Provider
				value={{
					...p58,
					handleSubmit: form.handleSubmit(
						p58.onSubmit,
						p58.onSubmitError
					),
				}}>
				{children}
			</P58Context.Provider>
		</FormProvider>
	);
};

P58Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








