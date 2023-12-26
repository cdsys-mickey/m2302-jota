import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA13 } from "@/hooks/modules/useA13";
import { A13Context } from "./A13Context";

export const A13Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a13 = useA13({ token: auth.token });

	return (
		<A13Context.Provider
			value={{
				...a13,
			}}>
			{children}
		</A13Context.Provider>
	);
};

A13Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
