import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA08 } from "../../hooks/jobs/useA08";
import { A08Context } from "./A08Context";

export const A08Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a08 = useA08({ token: auth.token });

	return (
		<A08Context.Provider
			value={{
				...a08,
			}}>
			{children}
		</A08Context.Provider>
	);
};

A08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
