import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH40 } from "./useH40";
import StdPrint from "../../modules/md-std-print";
import { H40Context } from "./H40Context";
import H40ReportType from "./pickers/H40ReportType.mjs";
import H40OrderType from "./pickers/H40OrderType.mjs";

export const H40Provider = ({ children }) => {
	const h40 = useH40();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SPDlineID: null,
			EPDlineID: null,
			reportType: H40ReportType.getDefaultOption(),
			orderType: H40OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H40Context.Provider
				value={{
					...h40,
					handleSubmit: form.handleSubmit(
						h40.onSubmit,
						h40.onSubmitError
					),
				}}>
				{children}
			</H40Context.Provider>
		</FormProvider>
	);
};

H40Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




