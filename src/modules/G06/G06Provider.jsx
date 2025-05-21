import PropTypes from "prop-types";
import { useContext } from "react";
import { useG06 } from "@/modules/G06/useG06";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { G06Context } from "./G06Context";

export const G06Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const g06 = useG06({ token: auth.token });

	return (
		<G06Context.Provider
			value={{
				...g06,
			}}>
			{children}
		</G06Context.Provider>
	);
};

G06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

