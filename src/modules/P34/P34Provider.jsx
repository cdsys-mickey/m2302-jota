import PropTypes from "prop-types";
import { useContext } from "react";
import { useP34 } from "@/modules/P34/useP34";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { P34Context } from "./P34Context";

export const P34Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p34 = useP34({ token: auth.token });

	return (
		<P34Context.Provider
			value={{
				...p34,
			}}>
			{children}
		</P34Context.Provider>
	);
};

P34Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

