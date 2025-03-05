import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useH21 } from "./useH21";
import StdPrint from "@/modules/StdPrint.mjs";
import { H21Context } from "./H21Context";

export const H21Provider = ({ children }) => {
	const h21 = useH21();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H21Context.Provider
				value={{
					...h21,
					handleSubmit: form.handleSubmit(
						h21.onSubmit,
						h21.onSubmitError
					),
				}}>
				{children}
			</H21Context.Provider>
		</FormProvider>
	);
};

H21Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




