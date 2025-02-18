import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH30 } from "./useH30";
import StdPrint from "../../modules/md-std-print";
import { H30Context } from "./H30Context";

export const H30Provider = ({ children }) => {
	const h30 = useH30();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SFactID: null,
			EFactID: null,
			SProdID: null,
			EProdID: null,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H30Context.Provider
				value={{
					...h30,
					handleSubmit: form.handleSubmit(
						h30.onSubmit,
						h30.onSubmitError
					),
				}}>
				{children}
			</H30Context.Provider>
		</FormProvider>
	);
};

H30Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



