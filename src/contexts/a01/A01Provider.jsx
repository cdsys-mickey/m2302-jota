import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA01 } from "../../hooks/modules/useA01";
import A01 from "../../modules/md-a01";
import { A01Context } from "./A01Context";

export const A01Provider = ({ children }) => {
	const auth = useContext(AuthContext);

	const a01 = useA01({
		token: auth.token,
		mode: A01.Mode.PROD,
	});

	return (
		<A01Context.Provider
			value={{
				...a01,
			}}>
			{children}
		</A01Context.Provider>
	);
};
A01Provider.displayName = "A01Provider";
A01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
//
