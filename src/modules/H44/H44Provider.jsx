import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H44Context } from "./H44Context";
import H44OrderType from "./pickers/H44OrderType.mjs";
import { useH44 } from "./useH44";

export const H44Provider = ({ children }) => {
	const h44 = useH44();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			Times: null,
			Minus: false,
			orderType: H44OrderType.getDefaultOption(),
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H44Context.Provider
				value={{
					...h44,
					handleSubmit: form.handleSubmit(
						h44.onSubmit,
						h44.onSubmitError
					),
				}}>
				{children}
			</H44Context.Provider>
		</FormProvider>
	);
};

H44Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






