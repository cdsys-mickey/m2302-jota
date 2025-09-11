import { useUnreadMessages } from "@/hooks/useUnreadMessages";
import { UnreadMessagesContext } from "./UnreadMessagesContext";
import PropTypes from "prop-types";

export const UnreadMessagesProvider = ({ children }) => {
	const unreadMessages = useUnreadMessages();

	return (
		<UnreadMessagesContext.Provider
			value={{
				...unreadMessages,
			}}>
			{children}
		</UnreadMessagesContext.Provider>
	);
};

UnreadMessagesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
