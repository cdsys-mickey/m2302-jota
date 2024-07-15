import { useC05 } from "../../hooks/jobs/useC05";
import { C05Context } from "./C05Context";
import PropTypes from "prop-types";

export const C05Provider = ({ children }) => {
	const c05 = useC05();

	return (
		<C05Context.Provider
			value={{
				...c05,
			}}>
			{children}
		</C05Context.Provider>
	);
};

C05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
