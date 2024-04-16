import PropTypes from "prop-types";
import { useContext } from "react";
import { useB06 } from "../../hooks/modules/useB06";
import { AuthContext } from "../auth/AuthContext";
import { B06Context } from "./B06Context";

export const B06Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const b06 = useB06({
		token: auth.token,
		deptId: auth.operator?.CurDeptID,
		logKey: auth.operator?.LogKey,
	});

	return (
		<B06Context.Provider
			value={{
				...b06,
			}}>
			{children}
		</B06Context.Provider>
	);
};

B06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
