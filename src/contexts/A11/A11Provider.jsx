import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA11 } from "@/hooks/modules/useA11";
import { A11Context } from "./A11Context";

export const A11Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a11 = useA11({ token: auth.token });

	return (
		<A11Context.Provider
			value={{
				...a11,
			}}>
			{children}
		</A11Context.Provider>
	);
};

A11Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
