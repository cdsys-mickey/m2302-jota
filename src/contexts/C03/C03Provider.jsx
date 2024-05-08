import { useC03 } from "../../hooks/modules/useC03";
import { C03Context } from "./C03Context";
import PropTypes from "prop-types";

export const C03Provider = ({ children }) => {
	const c03 = useC03();

	return (
		<C03Context.Provider
			value={{
				...c03,
			}}>
			{children}
		</C03Context.Provider>
	);
};

C03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
