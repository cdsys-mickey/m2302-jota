import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useF02 } from "../../hooks/jobs/useF02";
import { F02Context } from "./F02Context";

export const F02Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const f02 = useF02({ token: auth.token });

	return (
		<F02Context.Provider
			value={{
				...f02,
			}}>
			{children}
		</F02Context.Provider>
	);
};

F02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


