import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useP14 } from "./useP14";
import { P14Context } from "./P14Context";

export const P14Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const p14 = useP14({ token: auth.token });

	return (
		<P14Context.Provider
			value={{
				...p14,
			}}>
			{children}
		</P14Context.Provider>
	);
};

P14Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



