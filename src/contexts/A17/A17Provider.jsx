import PropTypes from "prop-types";
import { useA17 } from "../../hooks/jobs/useA17";
import { A17Context } from "./A17Context";
import { FormProvider, useForm } from "react-hook-form";

export const A17Provider = ({ children }) => {
	const a17 = useA17();
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...form}>
			<A17Context.Provider
				value={{
					...a17,
					handleSubmit: form.handleSubmit(
						a17.onEditorSubmit,
						a17.onEditorSubmitError
					),
				}}>
				{children}
			</A17Context.Provider>
		</FormProvider>
	);
};

A17Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
