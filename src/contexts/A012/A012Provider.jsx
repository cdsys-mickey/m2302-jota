import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA012 } from "../../hooks/modules/useA012";
import { ProdGridContext } from "../prod-grid/ProdGridContext";

export const A012Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a012 = useA012({ token: auth.token });

	return (
		<ProdGridContext.Provider
			value={{
				...a012,
			}}>
			{children}
		</ProdGridContext.Provider>
	);
};

A012Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
