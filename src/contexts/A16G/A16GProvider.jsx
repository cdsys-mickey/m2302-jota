import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA16G } from "@/hooks/jobs/useA16G";
import { A16GContext } from "./A16GContext";

export const A16GProvider = (props) => {
	const { children } = props;
	const { token } = useContext(AuthContext);
	const a16g = useA16G({ token });

	return (
		<A16GContext.Provider
			value={{
				...a16g,
			}}>
			{children}
		</A16GContext.Provider>
	);
};

A16GProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
