import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU051 } from "../../hooks/jobs/useU051";
import U051 from "../../modules/md-u051";
import StdPrint from "../../modules/md-std-print";
import { U051Context } from "./U051Context";

export const U051Provider = ({ children }) => {
	const u051 = useU051();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			SDate: new Date(),
			EDate: new Date(),
			RptType: U051.getDataTypeById(U051.DataType.SUMMARY),
		},
	});

	return (
		<FormProvider {...form}>
			<U051Context.Provider
				value={{
					...u051,
					handleSubmit: form.handleSubmit(
						u051.onSubmit,
						u051.onSubmitError
					),
				}}>
				{children}
			</U051Context.Provider>
		</FormProvider>
	);
};

U051Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




