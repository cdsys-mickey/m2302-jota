import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { P09Context } from "./P09Context";
import P09ReportType from "./pickers/P09ReportType.mjs";
import { useP09 } from "./useP09";
import P09DataSource from "./pickers/P09DataSource.mjs";
import P09OrderType from "./pickers/P09OrderType.mjs";
import OrderDirs from "../OrderDirs.mjs";
import P09CalType from "./pickers/P09CalType.mjs";

export const P09Provider = ({ children }) => {
	const p09 = useP09();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			Source: P09DataSource.getDefaultOption(),
			SProdID: null,
			EProdID: null,
			// InclTest: false,
			RptType: P09ReportType.getDefaultOption(),
			OrdName: P09OrderType.getDefaultOption(),
			OrdSeq: OrderDirs.getDefaultOption(),
			Rate: P09CalType.getDefaultOption(),
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







