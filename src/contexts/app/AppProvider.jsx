import PropTypes from "prop-types";
import { AppContext } from "./AppContext";
import useApp from "./useApp";

export const AppProvider = ({ children }) => {
	const app = useApp();

	return (
		<AppContext.Provider
			value={{
				...app
			}}>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.node,
};
