import { usePushMessages } from "../hooks/usePushMessages";
import { PushMessagesContext } from "./PushMessagesContext";
import PropTypes from "prop-types";

export const PushMessagesProvider = ({ children }) => {
	const pushMessages = usePushMessages();

	return (
		<PushMessagesContext.Provider
			value={{
				...pushMessages,
			}}>
			{children}
		</PushMessagesContext.Provider>
	);
};

PushMessagesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
