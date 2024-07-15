import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA014 } from "../../hooks/jobs/useA014";
import { ProdGridContext } from "../prod-grid/ProdGridContext";

export const A014Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a014 = useA014({ token: auth.token });

	return (
		<ProdGridContext.Provider
			value={{
				...a014,
			}}>
			{children}
		</ProdGridContext.Provider>
	);
};

A014Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
