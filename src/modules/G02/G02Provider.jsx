import { G02Context } from "./G02Context";
import PropTypes from "prop-types";
import { useG02 } from "./useG02";

export const G02Provider = ({ children }) => {
	const g02 = useG02();

	return (
		<G02Context.Provider
			value={{
				...g02,
			}}>
			{children}
		</G02Context.Provider>
	);
};

G02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

