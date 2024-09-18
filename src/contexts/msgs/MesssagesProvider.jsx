import { useMessages } from "../../hooks/useMessages";
import PropTypes from "prop-types";
import { MessagesContext } from "./MessagesContext";

export const MessagesProvider = ({ children }) => {
	const msgs = useMessages();

	return (
		<MessagesContext.Provider
			value={{
				...msgs,
			}}>
			{children}
		</MessagesContext.Provider>
	);
};

MessagesProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
