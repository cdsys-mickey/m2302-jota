import { useCallback, useState } from "react";
import { A01Context } from "./A01Context";
import PropTypes from "prop-types";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCrud } from "../../shared-hooks/useCrud";
import { useAction } from "../../shared-hooks/useAction";
import { useA01 } from "../../hooks/modules/useA01";

export const A01Provider = ({ children }) => {
	const auth = useContext(AuthContext);
	const crud = useCrud();

	const loader = useInfiniteLoader({
		url: "v1/prods",
		bearer: auth.token,
		initialFetchSize: 50,
	});

	const a01 = useA01({ token: auth.token });

	return (
		<A01Context.Provider
			value={{
				...loader,
				...crud,
				...a01,
			}}>
			{children}
		</A01Context.Provider>
	);
};

A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
