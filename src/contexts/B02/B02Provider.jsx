import { useB02 } from "../../hooks/jobs/useB02";
import { B02Context } from "./B02Context";
import PropTypes from "prop-types";

export const B02Provider = ({ children }) => {
	const b02 = useB02();

	return (
		<B02Context.Provider
			value={{
				...b02,
			}}>
			{children}
		</B02Context.Provider>
	);
};

B02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


