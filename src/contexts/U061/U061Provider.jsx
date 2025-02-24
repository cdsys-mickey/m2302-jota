import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU061 } from "../../hooks/jobs/useU061";
import U061 from "../../modules/md-u061";
import StdPrint from "../../modules/StdPrint.mjs";
import { U061Context } from "./U061Context";

export const U061Provider = ({ children }) => {
	const u061 = useU061();
	const form = useForm({
		defaultValues: {
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			SDeptID: null,
			SDate: new Date(),
			EDate: new Date(),
			RptType: U061.getDataTypeById(U061.DataType.SUMMARY),
		},
	});

	return (
		<FormProvider {...form}>
			<U061Context.Provider
				value={{
					...u061,
					handleSubmit: form.handleSubmit(
						u061.onSubmit,
						u061.onSubmitError
					),
				}}>
				{children}
			</U061Context.Provider>
		</FormProvider>
	);
};

U061Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};





