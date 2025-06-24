import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP22 } from "./useP22";
import StdPrint from "../StdPrint.mjs";
import { P22Context } from "./P22Context";

export const P22Provider = ({ children }) => {
	const p22 = useP22();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<P22Context.Provider
				value={{
					...p22,
					handleSubmit: form.handleSubmit(
						p22.onSubmit,
						p22.onSubmitError
					),
				}}>
				{children}
			</P22Context.Provider>
		</FormProvider>
	);
};

P22Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




