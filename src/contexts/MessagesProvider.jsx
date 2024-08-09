import { useMessages } from "../hooks/useMessages";
import { MessagesContext } from "./MessagesContext";
import PropTypes from "prop-types";

export const MessagesProvider = ({ children }) => {
	const messages = useMessages();

	return (
		<MessagesContext.Provider
			value={{
				...messages,
			}}>
			{children}
		</MessagesContext.Provider>
	);
};

MessagesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
