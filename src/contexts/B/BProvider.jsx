import { BContext } from "./BContext";
import PropTypes from "prop-types";

export const BProvider = ({ children, forNew = false }) => {

	return (
		<BContext.Provider
			value={{
				forNew
			}}>
			{children}
		</BContext.Provider>
	);
};

BProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	forNew: PropTypes.bool
}