import PropTypes from "prop-types";
import { useHome } from "../../hooks/modules/useHome";
import { HomeContext } from "./HomeContext";

export const HomeProvider = ({ children }) => {
	const home = useHome();

	return (
		<HomeContext.Provider
			value={{
				...home,
			}}>
			{children}
		</HomeContext.Provider>
	);
};

HomeProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
