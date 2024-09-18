import { useB011 } from "../../hooks/jobs/useB011";
import { B011Context } from "./B011Context";
import PropTypes from "prop-types";

export const B011Provider = ({ children }) => {
	const b011 = useB011();

	return (
		<B011Context.Provider
			value={{
				...b011,
			}}>
			{children}
		</B011Context.Provider>
	);
};

B011Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

