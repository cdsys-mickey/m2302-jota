import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { P09Context } from "./P09Context";
import P09ReportType from "./pickers/P09ReportType.mjs";
import { useP09 } from "./useP09";

export const P09Provider = ({ children }) => {
	const p09 = useP09();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			// InclTest: false,
			reportType: P09ReportType.getDefaultOption(),
			// orderType: P09OrderType.getDefaultOption(),
			// orderDir: OrderDir.getDefaultOption(),
			// calType: P09CalType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P09Context.Provider
				value={{
					...p09,
					handleSubmit: form.handleSubmit(
						p09.onSubmit,
						p09.onSubmitError
					),
				}}>
				{children}
			</P09Context.Provider>
		</FormProvider>
	);
};

P09Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







