import { DsgContext } from "./DsgContext";
import PropTypes from "prop-types";

export const DsgProvider = ({ children, ...rest }) => {
	return (
		<DsgContext.Provider
			value={{
				...rest,
			}}>
			{children}
		</DsgContext.Provider>
	);
};

DsgProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
