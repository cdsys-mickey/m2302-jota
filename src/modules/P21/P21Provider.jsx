import PropTypes from "prop-types";
import { useContext } from "react";
import { useP21 } from "@/modules/P21/useP21";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { P21Context } from "./P21Context";

export const P21Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p21 = useP21({ token: auth.token });

	return (
		<P21Context.Provider
			value={{
				...p21,
			}}>
			{children}
		</P21Context.Provider>
	);
};

P21Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


