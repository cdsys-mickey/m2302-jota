import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../md-std-print";
import { H53Context } from "./H53Context";
import H53OrderType from "./pickers/H53OrderType.mjs";
import { useH53 } from "./useH53";

export const H53Provider = ({ children }) => {
	const h53 = useH53();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			SPDlineID: null,
			EPDlineID: null,
			orderType: H53OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H53Context.Provider
				value={{
					...h53,
					handleSubmit: form.handleSubmit(
						h53.onSubmit,
						h53.onSubmitError
					),
				}}>
				{children}
			</H53Context.Provider>
		</FormProvider>
	);
};

H53Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






