import { useC07 } from "../../hooks/jobs/useC07";
import { C07Context } from "./C07Context";
import PropTypes from "prop-types";

export const C07Provider = ({ children }) => {
	const c07 = useC07();

	return (
		<C07Context.Provider
			value={{
				...c07,
			}}>
			{children}
		</C07Context.Provider>
	);
};

C07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
