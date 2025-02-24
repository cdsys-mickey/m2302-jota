import PropTypes from "prop-types";
import { useA18 } from "../../hooks/jobs/useA18";
import { A18Context } from "./A18Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/StdPrint.mjs";

export const A18Provider = ({ children }) => {
	const a18 = useA18();
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});

	return (
		<FormProvider {...form}>
			<A18Context.Provider
				value={{
					...a18,
				}}>
				{children}
			</A18Context.Provider>
		</FormProvider>
	);
};

A18Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
