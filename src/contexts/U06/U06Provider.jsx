import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU06 } from "../../hooks/jobs/useU06";
import U06 from "../../modules/md-u06";
import StdPrint from "../../modules/StdPrint.mjs";
import { U06Context } from "./U06Context";

export const U06Provider = ({ children }) => {
	const u06 = useU06();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U06.getDataTypeById(U06.DataType.SUMMARY),
		},
	});

	return (
		<FormProvider {...form}>
			<U06Context.Provider
				value={{
					...u06,
					handleSubmit: form.handleSubmit(
						u06.onSubmit,
						u06.onSubmitError
					),
				}}>
				{children}
			</U06Context.Provider>
		</FormProvider>
	);
};

U06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};




