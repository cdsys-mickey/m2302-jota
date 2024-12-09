import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU05 } from "../../hooks/jobs/useU05";
import U05 from "../../modules/md-u05";
import StdPrint from "../../modules/md-std-print";
import { U05Context } from "./U05Context";

export const U05Provider = ({ children }) => {
	const u05 = useU05();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			SDate: new Date(),
			EDate: new Date(),
			RptType: U05.getDataTypeById(U05.DataType.SUMMARY),
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



