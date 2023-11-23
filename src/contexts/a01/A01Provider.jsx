import { useCallback, useState } from "react";
import { A01Context } from "./A01Context";
import PropTypes from "prop-types";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const A01Provider = ({ children }) => {
	const [state, setState] = useState({});
	const auth = useContext(AuthContext);
	const loader = useInfiniteLoader({
		url: "v1/prods",
		bearer: auth.token,
		initialFetchSize: 29,
	});

	return (
		<A01Context.Provider
			value={{
				...state,
				...loader,
				// data: loader.data,
				// load: loader.load,
				// itemCount: loader.itemCount,
				// loadMoreItems: loader.loadMoreItems,
				// isItemLoaded: loader.isItemLoaded,
			}}>
			{children}
		</A01Context.Provider>
	);
};

A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
