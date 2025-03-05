import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH02 } from "./useH02";
import StdPrint from "../StdPrint.mjs";
import { H02Context } from "./H02Context";


export const H02Provider = ({ children }) => {
	const h02 = useH02();
	const form = useForm({
		defaultValues: {
			SalYM: null,
			InclTX: true,
			InclTest: false,
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H02Context.Provider
				value={{
					...h02,
					handleSubmit: form.handleSubmit(
						h02.onSubmit,
						h02.onSubmitError
					),
				}}>
				{children}
			</H02Context.Provider>
		</FormProvider>
	);
};

H02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


