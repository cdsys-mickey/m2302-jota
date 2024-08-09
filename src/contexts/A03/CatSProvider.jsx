import { CatSContext } from "./CatSContext";
import PropTypes from "prop-types";
import { useCatS } from "./useCatS";

export const CatSProvider = ({ children }) => {
	const catS = useCatS();

	return (
		<CatSContext.Provider
			value={{
				...catS,
			}}>
			{children}
		</CatSContext.Provider>
	);
};

CatSProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
