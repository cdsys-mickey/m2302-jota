import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { G10Context } from "./G10Context";
import { useG10 } from "./useG10";

export const G10Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const g10 = useG10({ token: auth.token });

	return (
		<G10Context.Provider
			value={{
				...g10,
			}}>
			{children}
		</G10Context.Provider>
	);
};

G10Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};







