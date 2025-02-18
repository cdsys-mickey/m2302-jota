import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH28 } from "./useH28";
import StdPrint from "../../modules/md-std-print";
import { H28Context } from "./H28Context";

export const H28Provider = ({ children }) => {
	const h28 = useH28();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H28Context.Provider
				value={{
					...h28,
					handleSubmit: form.handleSubmit(
						h28.onSubmit,
						h28.onSubmitError
					),
				}}>
				{children}
			</H28Context.Provider>
		</FormProvider>
	);
};

H28Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



