import PropTypes from "prop-types";
import { useContext } from "react";
import { useStdPrint } from "../../hooks/useStdPrint";
import { AuthContext } from "../auth/AuthContext";
import { StdPrintContext } from "./StdPrintContext";

export const StdPrintProvider = ({ children, tableName, paramsToJsonData }) => {
	const auth = useContext(AuthContext);
	const stdPrint = useStdPrint({
		token: auth.token,
		tableName,
		deptId: auth.operator?.CurDeptID,
		logKey: auth.operator.LogKey,
		paramsToJsonData,
	});

	return (
		<StdPrintContext.Provider
			value={{
				...stdPrint,
			}}>
			{children}
		</StdPrintContext.Provider>
	);
};

StdPrintProvider.propTypes = {
	tableName: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	paramsToJsonData: PropTypes.func,
};
