import PropTypes from "prop-types";
import { useMessaging } from "../../hooks/useMessaging";
import { MessagingContext } from "./MessagingContext";

export const MessagingProvider = ({ children }) => {
	const messaging = useMessaging();

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
