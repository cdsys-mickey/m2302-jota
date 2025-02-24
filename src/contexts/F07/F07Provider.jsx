import PropTypes from "prop-types";
import { useF07 } from "../../hooks/jobs/useF07";
import { F07Context } from "./F07Context";
import { FormProvider, useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import StdPrint from "../../modules/StdPrint.mjs";

export const F07Provider = ({ children }) => {
	const f07 = useF07();
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
			<F07Context.Provider
				value={{
					...f07,
				}}>
				{children}
			</F07Context.Provider>
		</FormProvider>
	);
};

F07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



