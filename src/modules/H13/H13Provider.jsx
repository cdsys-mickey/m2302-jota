import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H13Context } from "./H13Context";
import { useH13 } from "./useH13";

export const H13Provider = ({ children }) => {
	const h13 = useH13();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SCustID: null,
			ECustID: null,
			InclTest: false,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H13Context.Provider
				value={{
					...h13,
					handleSubmit: form.handleSubmit(
						h13.onSubmit,
						h13.onSubmitError
					),
				}}>
				{children}
			</H13Context.Provider>
		</FormProvider>
	);
};

H13Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};






