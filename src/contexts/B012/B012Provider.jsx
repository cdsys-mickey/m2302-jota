import { useB012 } from "../../hooks/jobs/useB012";
import { B012Context } from "./B012Context";
import PropTypes from "prop-types";

export const B012Provider = ({ children }) => {
	const b012 = useB012();

	return (
		<B012Context.Provider
			value={{
				...b012,
			}}>
			{children}
		</B012Context.Provider>
	);
};

B012Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


