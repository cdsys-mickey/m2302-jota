import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H22Context } from "./H22Context";
import { useH22 } from "./useH22";

export const H22Provider = ({ children }) => {
	const h22 = useH22();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<H22Context.Provider
				value={{
					...h22,
					handleSubmit: form.handleSubmit(
						h22.onSubmit,
						h22.onSubmitError
					),
				}}>
				{children}
			</H22Context.Provider>
		</FormProvider>
	);
};

H22Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






