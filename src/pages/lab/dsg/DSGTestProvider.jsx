import { useCallback, useState } from "react";
import { DSGTestContext } from "./DSGTestContext";
import PropTypes from "prop-types";
import { useRef } from "react";

export const DSGTestProvider = ({ children }) => {
	const [state, setState] = useState({
		data: null,
	});

	const gridRef = useRef();

	return (
		<DSGTestContext.Provider
			value={{
				gridRef,
				...state,
			}}>
			{children}
		</DSGTestContext.Provider>
	);
};

DSGTestProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
