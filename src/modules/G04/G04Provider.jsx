import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { G04Context } from "./G04Context";
import { useG04 } from "./useG04";

export const G04Provider = ({ children }) => {
	const g04 = useG04();
	const form = useForm();

	return (
		<FormProvider {...form}>
			<G04Context.Provider
				value={{
					...g04,
					handleSubmit: form.handleSubmit(
						g04.onSubmit,
						g04.onSubmitError
					),
				}}>
				{children}
			</G04Context.Provider>
		</FormProvider>
	);
};

G04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






