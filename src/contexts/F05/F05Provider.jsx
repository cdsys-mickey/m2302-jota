import PropTypes from "prop-types";
import { useF05 } from "../../hooks/jobs/useF05";
import { F05Context } from "./F05Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/StdPrint.mjs";

export const F05Provider = ({ children }) => {
	const f05 = useF05();
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<F05Context.Provider
				value={{
					...f05,
				}}>
				{children}
			</F05Context.Provider>
		</FormProvider>
	);
};

F05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};


