import { useContext } from "react";
import { MessagingContext } from "./MessagingContext";
import PropTypes from "prop-types";
import { useMessaging } from "../hooks/useMessaging";
import { AuthContext } from "./auth/AuthContext";

export const MessagingProvider = ({ children }) => {
	const { token } = useContext(AuthContext);
	const messaging = useMessaging({ token });

	return (
		<MessagingContext.Provider
			value={{
				...messaging,
			}}>
			{children}
		</MessagingContext.Provider>
	);
};

MessagingProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
