import { DSGTest4Context } from "./DSGTest4Context";
import PropTypes from "prop-types";
import { useDSGTest4 } from "./useDSGTest4";

export const DSGTest4Provider = ({ children }) => {
	const dsgTest4 = useDSGTest4();

	return (
		<DSGTest4Context.Provider
			value={{
				...dsgTest4,
			}}>
			{children}
		</DSGTest4Context.Provider>
	);
};

DSGTest4Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
