import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { P03Context } from "./P03Context";
import P03ReportType from "./pickers/P03ReportType.mjs";
import { useP03 } from "./useP03";

export const P03Provider = ({ children }) => {
	const p03 = useP03();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SCustID: null,
			ECustID: null,
			InclTest: false,
			reportType: P03ReportType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P03Context.Provider
				value={{
					...p03,
					handleSubmit: form.handleSubmit(
						p03.onSubmit,
						p03.onSubmitError
					),
				}}>
				{children}
			</P03Context.Provider>
		</FormProvider>
	);
};

P03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







