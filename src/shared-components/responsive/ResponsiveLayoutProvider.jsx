import ResponsiveLayoutContext from "./ResponsiveLayoutContext";
import PropTypes from "prop-types";

const ResponsiveLayoutProvider = ({ children, ...rest }) => {
	return (
		<ResponsiveLayoutContext.Provider
			value={{
				...rest
			}}>
			{children}
		</ResponsiveLayoutContext.Provider>
	);
};

ResponsiveLayoutProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default ResponsiveLayoutProvider;