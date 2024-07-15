import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA26 } from "../../hooks/jobs/useA26";
import { A26Context } from "./A26Context";

export const A26Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const a26 = useA26({ token: auth.token });

	return (
		<A26Context.Provider
			value={{
				...a26,
			}}>
			{children}
		</A26Context.Provider>
	);
};

A26Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
