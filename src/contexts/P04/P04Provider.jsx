import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useP04 } from "@/hooks/jobs/useP04";
import { P04Context } from "./P04Context";

export const P04Provider = ({ children }) => {
	const p04 = useP04();
	const form = useForm({
		defaultValues: {
			SDate: new Date(),
			EDate: null,
			SPosNo: null
		},
	});

	return (
		<FormProvider {...form}>
			<P04Context.Provider
				value={{
					...p04,
					handleSubmit: form.handleSubmit(
						p04.onSubmit,
						p04.onSubmitError
					),
				}}>
				{children}
			</P04Context.Provider>
		</FormProvider>
	);
};

P04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


