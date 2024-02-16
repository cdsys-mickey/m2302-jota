import PropTypes from "prop-types";
import { useA21 } from "../../hooks/modules/useA21";
import { A21Context } from "./A21Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/md-std-print";

export const A21Provider = ({ children }) => {
	const a21 = useA21();
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
			<A21Context.Provider
				value={{
					...a21,
					handleSubmit: form.handleSubmit(
						a21.onSubmit,
						a21.onSubmitError
					),
				}}>
				{children}
			</A21Context.Provider>
		</FormProvider>
	);
};

A21Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
