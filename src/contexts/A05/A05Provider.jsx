import PropTypes from "prop-types";
import { useContext } from "react";
import { useA05 } from "../../hooks/modules/useA05";
import { AuthContext } from "../auth/AuthContext";
import { A05Context } from "./A05Context";

export const A05Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const a05 = useA05({ token: auth.token });

	return (
		<A05Context.Provider
			value={{
				...a05,
			}}>
			{children}
		</A05Context.Provider>
	);
};

A05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
