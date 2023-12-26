import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA10 } from "../../hooks/modules/useA10";
import { A10Context } from "./A10Context";

export const A10Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a10 = useA10({ token: auth.token });

	return (
		<A10Context.Provider
			value={{
				...a10,
			}}>
			{children}
		</A10Context.Provider>
	);
};

A10Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
