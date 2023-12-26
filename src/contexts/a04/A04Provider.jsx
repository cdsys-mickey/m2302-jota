import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA04 } from "../../hooks/modules/useA04";
import { A04Context } from "./A04Context";

export const A04Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a04 = useA04({ token: auth.token });

	return (
		<A04Context.Provider
			value={{
				...a04,
			}}>
			{children}
		</A04Context.Provider>
	);
};

A04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
