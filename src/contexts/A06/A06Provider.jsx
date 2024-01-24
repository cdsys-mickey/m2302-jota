import PropTypes from "prop-types";
import { useContext } from "react";
import { A06Context } from "./A06Context";
import { useA06 } from "../../hooks/modules/useA06";
import { AuthContext } from "../auth/AuthContext";
import A06 from "../../modules/md-a06";

export const A06Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const a06 = useA06({ token: auth.token, mode: A06.Mode.CUSTOMER });

	return (
		<A06Context.Provider
			value={{
				...a06,
			}}>
			{children}
		</A06Context.Provider>
	);
};

A06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
