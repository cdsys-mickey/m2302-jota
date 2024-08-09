import { CatMContext } from "./CatMContext";
import PropTypes from "prop-types";
import { useCatM } from "./useCatM";

export const CatMProvider = ({ children }) => {
	const catM = useCatM();

	return (
		<CatMContext.Provider value={{ ...catM }}>
			{children}
		</CatMContext.Provider>
	);
};

CatMProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
