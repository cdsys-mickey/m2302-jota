import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP10 } from "./useP10";
import StdPrint from "../StdPrint.mjs";
import { P10Context } from "./P10Context";

export const P10Provider = ({ children }) => {
	const p10 = useP10();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			InclTX: true,
			InclTest: false,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P10Context.Provider
				value={{
					...p10,
					handleSubmit: form.handleSubmit(
						p10.onSubmit,
						p10.onSubmitError
					),
				}}>
				{children}
			</P10Context.Provider>
		</FormProvider>
	);
};

P10Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



