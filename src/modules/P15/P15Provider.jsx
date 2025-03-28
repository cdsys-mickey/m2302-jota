import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP15 } from "./useP15";
import StdPrint from "../StdPrint.mjs";
import { P15Context } from "./P15Context";

export const P15Provider = ({ children }) => {
	const p15 = useP15();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			STime: null,
			ETime: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P15Context.Provider
				value={{
					...p15,
					handleSubmit: form.handleSubmit(
						p15.onSubmit,
						p15.onSubmitError
					),
				}}>
				{children}
			</P15Context.Provider>
		</FormProvider>
	);
};

P15Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



