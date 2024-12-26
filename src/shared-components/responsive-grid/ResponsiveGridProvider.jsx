import { ResponsiveGridContext } from "./ResponsiveGridContext";
import PropTypes from "prop-types";

const ResponsiveGridProvider = ({ children, ...rest }) => {
	return (
		<ResponsiveGridContext.Provider
			value={{
				...rest
			}}>
			{children}
		</ResponsiveGridContext.Provider>
	);
};

ResponsiveGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ResponsiveGridProvider;