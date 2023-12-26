import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA14 } from "@/hooks/modules/useA14";
import { A14Context } from "./A14Context";

export const A14Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a14 = useA14({ token: auth.token });

	return (
		<A14Context.Provider
			value={{
				...a14,
			}}>
			{children}
		</A14Context.Provider>
	);
};

A14Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
