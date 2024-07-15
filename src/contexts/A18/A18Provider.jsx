import PropTypes from "prop-types";
import { useA18 } from "../../hooks/jobs/useA18";
import { A18Context } from "./A18Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/md-std-print";

export const A18Provider = ({ children }) => {
	const a18 = useA18();
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			outputType: StdPrint.getById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<A18Context.Provider
				value={{
					...a18,
					handleSubmit: form.handleSubmit(
						a18.onSubmit,
						a18.onSubmitError
					),
				}}>
				{children}
			</A18Context.Provider>
		</FormProvider>
	);
};

A18Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
