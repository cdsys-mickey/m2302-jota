import PropTypes from "prop-types";
import { useContext } from "react";
import { useP35 } from "@/modules/P35/useP35";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { P35Context } from "./P35Context";

export const P35Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const p35 = useP35({ token: auth.token });

	return (
		<P35Context.Provider
			value={{
				...p35,
			}}>
			{children}
		</P35Context.Provider>
	);
};

P35Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


