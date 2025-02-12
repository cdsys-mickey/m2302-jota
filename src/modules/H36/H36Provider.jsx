import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH36 } from "./useH36";
import StdPrint from "../../modules/md-std-print";
import { H36Context } from "./H36Context";

export const H36Provider = ({ children }) => {
	const h36 = useH36();
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
			<H36Context.Provider
				value={{
					...h36,
					handleSubmit: form.handleSubmit(
						h36.onSubmit,
						h36.onSubmitError
					),
				}}>
				{children}
			</H36Context.Provider>
		</FormProvider>
	);
};

H36Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



