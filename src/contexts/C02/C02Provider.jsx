import { useC02 } from "../../hooks/jobs/useC02";
import { C02Context } from "./C02Context";
import PropTypes from "prop-types";

export const C02Provider = ({ children }) => {
	const c02 = useC02();

	return (
		<C02Context.Provider
			value={{
				...c02,
			}}>
			{children}
		</C02Context.Provider>
	);
};

C02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
