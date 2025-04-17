import { B05Context } from "./B05Context";
import PropTypes from "prop-types";
import { useB05 } from "./useB05";

export const B05Provider = ({ children }) => {
	const b05 = useB05();

	return (
		<B05Context.Provider
			value={{
				...b05,
			}}>
			{children}
		</B05Context.Provider>
	);
};

B05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
