import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA013 } from "../../hooks/modules/useA013";
import { ProdGridContext } from "../prod-grid/ProdGridContext";

export const A013Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a013 = useA013({ token: auth.token });

	return (
		<ProdGridContext.Provider
			value={{
				...a013,
			}}>
			{children}
		</ProdGridContext.Provider>
	);
};

A013Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
