import { useAllMessages } from "@/hooks/useAllMessages";
import PropTypes from "prop-types";
import { AllMessagesContext } from "./AllMessagesContext";

export const AllMessagesProvider = ({ children }) => {
	const allMessages = useAllMessages();

	return (
		<AllMessagesContext.Provider
			value={{
				...allMessages,
			}}>
			{children}
		</AllMessagesContext.Provider>
	);
};

AllMessagesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
