import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H17Context } from "./H17Context";
import H17OrderType from "./pickers/H17OrderType.mjs";
import H17ReportType from "./pickers/H17ReportType.mjs";
import { useH17 } from "./useH17";

export const H17Provider = ({ children }) => {
	const h17 = useH17();
	const form = useForm({
		defaultValues: {
			SArrDate: null,
			EArrDate: null,
			// InclTest: false,
			reportType: H17ReportType.getDefaultOption(),
			orderType: H17OrderType.getDefaultOption(),
			// orderDir: OrderDir.getDefaultOption(),
			// calType: H17CalType.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H17Context.Provider
				value={{
					...h17,
					handleSubmit: form.handleSubmit(
						h17.onSubmit,
						h17.onSubmitError
					),
				}}>
				{children}
			</H17Context.Provider>
		</FormProvider>
	);
};

H17Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






