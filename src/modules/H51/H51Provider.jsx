import StdPrint from "@/modules/StdPrint.mjs";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H51Context } from "./H51Context";
import { useH51 } from "./useH51";

export const H51Provider = ({ children }) => {
	const h51 = useH51();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H51Context.Provider
				value={{
					...h51,
					handleSubmit: form.handleSubmit(
						h51.onSubmit,
						h51.onSubmitError
					),
				}}>
				{children}
			</H51Context.Provider>
		</FormProvider>
	);
};

H51Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







