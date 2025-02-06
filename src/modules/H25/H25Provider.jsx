import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH25 } from "./useH25";
import StdPrint from "../../modules/md-std-print";
import { H25Context } from "./H25Context";

export const H25Provider = ({ children }) => {
	const h25 = useH25();
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
			<H25Context.Provider
				value={{
					...h25,
					handleSubmit: form.handleSubmit(
						h25.onSubmit,
						h25.onSubmitError
					),
				}}>
				{children}
			</H25Context.Provider>
		</FormProvider>
	);
};

H25Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



