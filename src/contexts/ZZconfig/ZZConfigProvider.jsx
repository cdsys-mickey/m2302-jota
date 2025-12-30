import PropTypes from "prop-types";
import ConfigContext from "./ConfigContext";

const ConfigProvider = ({ children, ...rest }) => {

	return (
		<ConfigContext.Provider
			value={{
				...rest
			}}>
			{children}
		</ConfigContext.Provider>
	);
};

ConfigProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default ConfigProvider