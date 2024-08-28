import PropTypes from "prop-types";
import { useA21 } from "../../hooks/jobs/useA21";
import { A21Context } from "./A21Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/md-std-print";

export const A21Provider = ({ children }) => {
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			Name: "Y",
			Tel: "Y",
			InvAddr: "Y",
			ToAddr: "Y",
			SalesID: "Y",
			InvNo: "Y",
			DelyNo: "Y",
			outputType: StdPrint.findById(StdPrint.OutputModes.HTML),
		},
	});
	const a21 = useA21({ form });

	return (
		<FormProvider {...form}>
			<A21Context.Provider
				value={{
					...a21,
				}}>
				{children}
			</A21Context.Provider>
		</FormProvider>
	);
};

A21Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
