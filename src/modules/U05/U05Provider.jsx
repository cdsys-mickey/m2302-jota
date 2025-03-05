import { useU05 } from "@/hooks/jobs/useU05";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { U05Context } from "./U05Context";
import U05DataType from "./picker/U05DataType.mjs";

export const U05Provider = ({ children }) => {
	const u05 = useU05();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.getDefaultOption(),
			SDate: new Date(),
			EDate: new Date(),
			RptType: U05DataType.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<U05Context.Provider
				value={{
					...u05,
					handleSubmit: form.handleSubmit(
						u05.onSubmit,
						u05.onSubmitError
					),
				}}>
				{children}
			</U05Context.Provider>
		</FormProvider>
	);
};

U05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



