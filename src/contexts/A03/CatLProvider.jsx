import { CatLContext } from "./CatLContext";
import PropTypes from "prop-types";
import { useCatL } from "./useCatL";

export const CatLProvider = ({ children }) => {
	const catL = useCatL();

	return (
		<CatLContext.Provider
			value={{
				...catL,
			}}>
			{children}
		</CatLContext.Provider>
	);
};

CatLProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
