import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import StdPrint from "../StdPrint.mjs";
import { A28Context } from "./A28Context";
import A28OrderTypes from "./pickers/A28OrderTypes.mjs";
import { useA28 } from "./useA28";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useContext } from "react";

export const A28Provider = ({ children }) => {
	const a28 = useA28();
	const auth = useContext(AuthContext);
	const { operator } = auth;
	const form = useForm({
		defaultValues: {
			dept: operator ? {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			} : null,
			SDate: new Date(),
			EDate: new Date(),
			outputType: StdPrint.getDefaultOption(),
			OrderBy: A28OrderTypes.getDefaultOption(),
			Top: 20
		},
	});

	return (
		<FormProvider {...form}>
			<A28Context.Provider
				value={{
					...a28,
					handleSubmit: form.handleSubmit(
						a28.onSubmit,
						a28.onSubmitError
					),
				}}>
				{children}
			</A28Context.Provider>
		</FormProvider>
	);
};

A28Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};









