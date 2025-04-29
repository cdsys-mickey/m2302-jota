import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useG05 } from "./useG05";
import StdPrint from "../StdPrint.mjs";
import { G05Context } from "./G05Context";
import G05ReportType from "./picker/G05ReportType.mjs";


export const G05Provider = ({ children }) => {
	const g05 = useG05();
	const form = useForm({
		defaultValues: {
			RptType: G05ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<G05Context.Provider
				value={{
					...g05,
					handleSubmit: form.handleSubmit(
						g05.onSubmit,
						g05.onSubmitError
					),
				}}>
				{children}
			</G05Context.Provider>
		</FormProvider>
	);
};

G05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




