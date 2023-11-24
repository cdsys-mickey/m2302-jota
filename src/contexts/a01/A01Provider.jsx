import { useCallback, useState } from "react";
import { A01Context } from "./A01Context";
import PropTypes from "prop-types";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCrud } from "../../shared-hooks/useCrud";

export const A01Provider = ({ children }) => {
	// const [state, setState] = useState({});
	const auth = useContext(AuthContext);
	const crud = useCrud();
	const loader = useInfiniteLoader({
		url: "v1/prods",
		bearer: auth.token,
		initialFetchSize: 50,
	});

	return (
		<A01Context.Provider
			value={{
				// ...state,
				...loader,
				...crud,
			}}>
			{children}
		</A01Context.Provider>
	);
};

A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
