import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA011 } from "../../hooks/modules/useA011";
import { A011Context } from "./A011Context";

export const A011Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a011 = useA011({ token: auth.token });

	return (
		<A011Context.Provider
			value={{
				...a011,
			}}>
			{children}
		</A011Context.Provider>
	);
};

A011Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
