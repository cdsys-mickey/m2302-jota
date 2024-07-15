import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA09 } from "../../hooks/jobs/useA09";
import { A09Context } from "./A09Context";

export const A09Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a09 = useA09({ token: auth.token });

	return (
		<A09Context.Provider
			value={{
				...a09,
			}}>
			{children}
		</A09Context.Provider>
	);
};

A09Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
