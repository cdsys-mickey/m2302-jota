import StdPrint from "@/modules/md-std-print";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { H34Context } from "./H34Context";
import { useH34 } from "./useH34";

export const H34Provider = ({ children }) => {
	const h34 = useH34();
	const form = useForm({
		defaultValues: {
			SDate: null,
			EDate: null,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<H34Context.Provider
				value={{
					...h34,
					handleSubmit: form.handleSubmit(
						h34.onSubmit,
						h34.onSubmitError
					),
				}}>
				{children}
			</H34Context.Provider>
		</FormProvider>
	);
};

H34Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};







