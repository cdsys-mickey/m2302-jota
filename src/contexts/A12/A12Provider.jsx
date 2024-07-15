import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA12 } from "@/hooks/jobs/useA12";
import { A12Context } from "./A12Context";

export const A12Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a12 = useA12({ token: auth.token });

	return (
		<A12Context.Provider
			value={{
				...a12,
			}}>
			{children}
		</A12Context.Provider>
	);
};

A12Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
