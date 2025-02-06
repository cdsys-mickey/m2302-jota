import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH24 } from "./useH24";
import StdPrint from "../../modules/md-std-print";
import { H24Context } from "./H24Context";

export const H24Provider = ({ children }) => {
	const h24 = useH24();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTX: true,
			InclTest: false,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H24Context.Provider
				value={{
					...h24,
					handleSubmit: form.handleSubmit(
						h24.onSubmit,
						h24.onSubmitError
					),
				}}>
				{children}
			</H24Context.Provider>
		</FormProvider>
	);
};

H24Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



