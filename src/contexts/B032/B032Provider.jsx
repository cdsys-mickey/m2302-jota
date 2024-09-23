import { useB032 } from "../../hooks/jobs/useB032";
import { B032Context } from "./B032Context";
import PropTypes from "prop-types";

export const B032Provider = ({ children }) => {
	const b032 = useB032();

	return (
		<B032Context.Provider
			value={{
				...b032,
			}}>
			{children}
		</B032Context.Provider>
	);
};

B032Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



