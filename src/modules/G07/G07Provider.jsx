import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { G07Context } from "./G07Context";
import { useG07 } from "./useG07";


export const G07Provider = ({ children }) => {
	const g07 = useG07();
	const form = useForm({
		defaultValues: {

		},
	});

	return (
		<FormProvider {...form}>
			<G07Context.Provider
				value={{
					...g07,
					handleSubmit: form.handleSubmit(
						g07.onSubmit,
						g07.onSubmitError
					),
				}}>
				{children}
			</G07Context.Provider>
		</FormProvider>
	);
};

G07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







