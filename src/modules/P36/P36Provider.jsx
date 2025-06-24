import PropTypes from "prop-types";
import { useContext } from "react";
import { useP36 } from "@/modules/P36/useP36";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { P36Context } from "./P36Context";

export const P36Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p36 = useP36({ token: auth.token });

	return (
		<P36Context.Provider
			value={{
				...p36,
			}}>
			{children}
		</P36Context.Provider>
	);
};

P36Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



