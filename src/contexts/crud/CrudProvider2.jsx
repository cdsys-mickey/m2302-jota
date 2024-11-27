import PropTypes from "prop-types";
import { useCrud } from "../../shared-hooks/useCrud";
import CrudContext2 from "./CrudContext2";

export const CrudProvider2 = ({ children }) => {
	const crud = useCrud();

	return (
		<CrudContext2.Provider
			value={{
				...crud,
			}}>
			{children}
		</CrudContext2.Provider>
	);
};

CrudProvider2.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
