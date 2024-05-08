import { useC04 } from "../../hooks/modules/useC04";
import { C04Context } from "./C04Context";
import PropTypes from "prop-types";

export const C04Provider = ({ children }) => {
	const c04 = useC04();

	return (
		<C04Context.Provider
			value={{
				...c04,
			}}>
			{children}
		</C04Context.Provider>
	);
};

C04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
