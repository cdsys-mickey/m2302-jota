import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H39Context } from "./H39Context";
import { useH39 } from "./useH39";

export const H39Provider = ({ children }) => {
	const h39 = useH39();
	const form = useForm({
		defaultValues: {
			SProdID: null,
			EProdID: null,
			SDate1: null,
			EDate1: null,
			SDate2: null,
			EDate2: null,
		},
	});

	return (
		<FormProvider {...form}>
			<H39Context.Provider
				value={{
					...h39,
					handleSubmit: form.handleSubmit(
						h39.onSubmit,
						h39.onSubmitError
					),
				}}>
				{children}
			</H39Context.Provider>
		</FormProvider>
	);
};

H39Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





