import { useRef } from "react";
import { InfiniteLoaderContext } from "./InfiniteLoaderContext";
import PropTypes from "prop-types";

export const InfiniteLoaderProvider = ({ children }) => {
	const paramsRef = useRef({});

	return (
		<InfiniteLoaderContext.Provider
			value={{
				paramsRef,
			}}>
			{children}
		</InfiniteLoaderContext.Provider>
	);
};

InfiniteLoaderProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
