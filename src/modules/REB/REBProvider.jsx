import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { REBContext } from "./REBContext";
import { useREB } from "./useREB";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";


export const REBProvider = ({ children }) => {
	const reb = useREB();
	const auth = useContext(AuthContext);
	const { operator } = auth;

	const form = useForm({
		defaultValues: {
			dept: operator ? {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			} : null,
			beginDate: null,
			endDate: null
		},
	});

	return (
		<FormProvider {...form}>
			<REBContext.Provider
				value={{
					...reb,
				}}>
				{children}
			</REBContext.Provider>
		</FormProvider>
	);
};

REBProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};








