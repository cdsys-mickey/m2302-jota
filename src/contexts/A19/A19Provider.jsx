import PropTypes from "prop-types";
import { useA19 } from "../../hooks/jobs/useA19";
import { A19Context } from "./A19Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/md-std-print";
import A19 from "../../modules/md-a19";

export const A19Provider = ({ children }) => {
	const a19 = useA19();
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			sdept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			outputType: StdPrint.getById(StdPrint.OutputModes.HTML),
			dataType: A19.getDataTypeById(A19.DataType.STOCK),
		},
	});

	return (
		<FormProvider {...form}>
			<A19Context.Provider
				value={{
					...a19,
					handleSubmit: form.handleSubmit(
						a19.onSubmit,
						a19.onSubmitError
					),
				}}>
				{children}
			</A19Context.Provider>
		</FormProvider>
	);
};

A19Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
