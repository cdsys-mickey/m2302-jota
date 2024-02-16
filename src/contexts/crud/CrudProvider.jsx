import PropTypes from "prop-types";
import { useCrud } from "../../shared-hooks/useCrud";
import CrudContext from "./CrudContext";

export const CrudProvider = ({ children }) => {
	const crud = useCrud();

	return (
		<CrudContext.Provider
			value={{
				...crud,
			}}>
			{children}
		</CrudContext.Provider>
	);
};

CrudProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
