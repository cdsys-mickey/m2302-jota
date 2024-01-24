import PropTypes from "prop-types";
import { useContext } from "react";
import { useA06 } from "../../hooks/modules/useA06";
import A06 from "../../modules/md-a06";
import { A06Context } from "../A06/A06Context";
import { AuthContext } from "../auth/AuthContext";

export const A07Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const a07 = useA06({ token: auth.token, mode: A06.Mode.NEW_CUSTOMER });

	return (
		<A06Context.Provider
			value={{
				...a07,
			}}>
			{children}
		</A06Context.Provider>
	);
};

A07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
