import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH32 } from "./useH32";
import StdPrint from "../StdPrint.mjs";
import { H32Context } from "./H32Context";

export const H32Provider = ({ children }) => {
	const h32 = useH32();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SFactID: null,
			EFactID: null,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H32Context.Provider
				value={{
					...h32,
					handleSubmit: form.handleSubmit(
						h32.onSubmit,
						h32.onSubmitError
					),
				}}>
				{children}
			</H32Context.Provider>
		</FormProvider>
	);
};

H32Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




