import PropTypes from "prop-types";
import { useContext } from "react";
import { useA16 } from "./useA16";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { A16Context } from "./A16Context";

export const A16Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const a16 = useA16({ token: auth.token });

	return (
		<A16Context.Provider
			value={{
				...a16,
			}}>
			{children}
		</A16Context.Provider>
	);
};

A16Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

