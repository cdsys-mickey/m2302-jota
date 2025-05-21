import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useG07 } from "./useG07";
import StdPrint from "../StdPrint.mjs";
import { G07Context } from "./G07Context";
import G07ReportType from "./picker/G07ReportType.mjs";


export const G07Provider = ({ children }) => {
	const g07 = useG07();
	const form = useForm({
		defaultValues: {
			RptType: G07ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<G07Context.Provider
				value={{
					...g07,
					handleSubmit: form.handleSubmit(
						g07.onSubmit,
						g07.onSubmitError
					),
				}}>
				{children}
			</G07Context.Provider>
		</FormProvider>
	);
};

G07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







