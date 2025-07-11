import PropTypes from "prop-types";
import { useContext } from "react";
import { useP42 } from "@/modules/P42/useP42";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { P42Context } from "./P42Context";

export const P42Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p42 = useP42({ token: auth.token });

	return (
		<P42Context.Provider
			value={{
				...p42,
			}}>
			{children}
		</P42Context.Provider>
	);
};

P42Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};




