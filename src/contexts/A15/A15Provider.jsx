import { AuthContext } from "@/contexts/auth/AuthContext";
import { useA15 } from "@/hooks/modules/useA15";
import PropTypes from "prop-types";
import { useContext } from "react";
import { A15Context } from "./A15Context";

export const A15Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a15 = useA15({ token: auth.token });

	return (
		<A15Context.Provider
			value={{
				...a15,
			}}>
			{children}
		</A15Context.Provider>
	);
};

A15Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
