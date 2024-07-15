import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA011 } from "../../hooks/jobs/useA011";
import { ProdGridContext } from "../prod-grid/ProdGridContext";

export const A011Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a011 = useA011({ token: auth.token });

	return (
		<ProdGridContext.Provider
			value={{
				...a011,
			}}>
			{children}
		</ProdGridContext.Provider>
	);
};

A011Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
