import PropTypes from "prop-types";
import { useContext } from "react";
import { useA20 } from "../../hooks/modules/useA20";
import { AuthContext } from "../auth/AuthContext";
import { A20Context } from "./A20Context";

export const A20Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const a20 = useA20({ token: auth.token });

	return (
		<A20Context.Provider
			value={{
				...a20,
			}}>
			{children}
		</A20Context.Provider>
	);
};

A20Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
