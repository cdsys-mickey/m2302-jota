import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA02 } from "../../hooks/modules/useA02";
import { A02Context } from "./A02Context";

export const A02Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a02 = useA02({ token: auth.token });

	return (
		<A02Context.Provider
			value={{
				...a02,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
