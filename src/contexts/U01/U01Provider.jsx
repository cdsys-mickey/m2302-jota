import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useU01 } from "../../hooks/jobs/useU01";
import U01 from "../../modules/md-u01";
import StdPrint from "../../modules/md-std-print";
import { U01Context } from "./U01Context";

export const U01Provider = ({ children }) => {
	const u01 = useU01();
	const form = useForm({
		defaultValues: {
			SDeptID: null,
			EDeptID: null,
			SDate: null,
			EDate: null,
			SProdID: null,
			EProdID: null,
			InvTx: true,
			SType: false,
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
			RptType: U01.getDataTypeById(U01.DataType.SUMMARY),
		},
	});

	return (
		<FormProvider {...form}>
			<U01Context.Provider
				value={{
					...u01,
					handleSubmit: form.handleSubmit(
						u01.onSubmit,
						u01.onSubmitError
					),
				}}>
				{children}
			</U01Context.Provider>
		</FormProvider>
	);
};

U01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


