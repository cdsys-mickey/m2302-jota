import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useG09 } from "./useG09";
import StdPrint from "../StdPrint.mjs";
import { G09Context } from "./G09Context";
import G09ReportType from "./picker/G09ReportType.mjs";


export const G09Provider = ({ children }) => {
	const g09 = useG09();
	const form = useForm({
		defaultValues: {
			RptType: G09ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<G09Context.Provider
				value={{
					...g09,
					handleSubmit: form.handleSubmit(
						g09.onSubmit,
						g09.onSubmitError
					),
				}}>
				{children}
			</G09Context.Provider>
		</FormProvider>
	);
};

G09Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





