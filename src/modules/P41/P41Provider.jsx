import { AuthContext } from "@/contexts/auth/AuthContext";
import { useP41 } from "@/modules/P41/useP41";
import PropTypes from "prop-types";
import { useContext } from "react";
import { P41Context } from "./P41Context";

export const P41Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p41 = useP41({ token: auth.token });

	return (
		<P41Context.Provider
			value={{
				...p41,
			}}>
			{children}
		</P41Context.Provider>
	);
};

P41Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



