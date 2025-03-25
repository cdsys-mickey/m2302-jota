import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH36 } from "./useH36";
import StdPrint from "../StdPrint.mjs";
import { H36Context } from "./H36Context";
import H36ReportType from "./pickers/H36ReportType.mjs";
import H36OrderType from "./pickers/H36OrderType.mjs";

export const H36Provider = ({ children }) => {
	const h36 = useH36();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SPDlineID: null,
			EPDlineID: null,
			reportType: H36ReportType.getDefaultOption(),
			orderType: H36OrderType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H36Context.Provider
				value={{
					...h36,
					handleSubmit: form.handleSubmit(
						h36.onSubmit,
						h36.onSubmitError
					),
				}}>
				{children}
			</H36Context.Provider>
		</FormProvider>
	);
};

H36Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



