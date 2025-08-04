import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { P56Context } from "./P56Context";
import P56ReportType from "./pickers/P56ReportTypes.mjs";
import { useP56 } from "./useP56";

export const P56Provider = ({ children }) => {
	const p56 = useP56();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: new Date(),
			SCtAreaID: null,
			ECtAreaID: null,
			SCityID: null,
			ECityID: null,
			STrvID: null,
			ETrvID: "",
			reportType: P56ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P56Context.Provider
				value={{
					...p56,
					handleSubmit: form.handleSubmit(
						p56.onSubmit,
						p56.onSubmitError
					),
				}}>
				{children}
			</P56Context.Provider>
		</FormProvider>
	);
};

P56Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








