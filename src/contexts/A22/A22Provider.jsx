import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA22 } from "../../hooks/modules/useA22";
import { A22Context } from "./A22Context";

export const A22Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a22 = useA22({ token: auth.token });

	return (
		<A22Context.Provider
			value={{
				...a22,
			}}>
			{children}
		</A22Context.Provider>
	);
};

A22Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
