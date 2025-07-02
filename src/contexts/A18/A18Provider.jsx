import A18OrderBy from "@/components/jobs/A18/A18OrderBy.mjs";
import PropTypes from "prop-types";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useA18 } from "../../hooks/jobs/useA18";
import StdPrint from "../../modules/StdPrint.mjs";
import { AuthContext } from "../auth/AuthContext";
import { A18Context } from "./A18Context";

export const A18Provider = ({ children }) => {
	const a18 = useA18();
	const { operator } = useContext(AuthContext);
	const form = useForm({
		defaultValues: {
			dept: {
				DeptID: operator.CurDeptID,
				AbbrName: operator.CurDeptName,
			},
			orderBy: A18OrderBy.getDefaultOption(),
			outputType: StdPrint.getDefaultOption(),
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
