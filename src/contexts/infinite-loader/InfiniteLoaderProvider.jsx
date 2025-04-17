import { useRef } from "react";
import { InfiniteLoaderContext } from "./InfiniteLoaderContext";
import PropTypes from "prop-types";
import { useCallback } from "react";
import useCheckboxes from "@/shared-hooks/useCheckboxes";

export const InfiniteLoaderProvider = ({ children }) => {
	const paramsRef = useRef({});

	const getActiveParams = useCallback(() => {
		return paramsRef?.current;
	}, []);

	const setActiveParams = useCallback((params) => {
		paramsRef.current = params;
	}, []);

	const checkboxes = useCheckboxes();

	return (
		<InfiniteLoaderContext.Provider
			value={{
				paramsRef,
				getActiveParams,
				setActiveParams,
				...checkboxes
			}}>
			{children}
		</InfiniteLoaderContext.Provider>
	);
};

InfiniteLoaderProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
