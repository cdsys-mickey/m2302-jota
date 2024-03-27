import PropTypes from "prop-types";
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = (props) => {
	const { children } = props;
	const auth = useAuth();

	return (
		<AuthContext.Provider
			value={{
				...auth,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.element,
};
