import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA015 } from "../../hooks/jobs/useA015";
import { ProdGridContext } from "../prod-grid/ProdGridContext";

export const A015Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a015 = useA015({ token: auth.token });

	return (
		<ProdGridContext.Provider
			value={{
				...a015,
			}}>
			{children}
		</ProdGridContext.Provider>
	);
};

A015Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
