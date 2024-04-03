import { useContext } from "react";
import { useZA03CopyAuth } from "../../hooks/modules/useZA03CopyAuth";
import { ZA03CopyAuthContext } from "./ZA03CopyAuthContext";
import PropTypes from "prop-types";
import { AuthContext } from "../auth/AuthContext";

export const ZA03CopyAuthProvider = ({ children }) => {
	const auth = useContext(AuthContext);
	const copyAuth = useZA03CopyAuth({ token: auth.token });

	return (
		<ZA03CopyAuthContext.Provider
			value={{
				...copyAuth,
			}}>
			{children}
		</ZA03CopyAuthContext.Provider>
	);
};

ZA03CopyAuthProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
