import { useCallback, useState } from "react";
import CrudContext from "./CrudContext";
import { useMemo } from "react";
import PropTypes from "prop-types";
import { useCrud } from "../../shared-hooks/useCrud";

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
