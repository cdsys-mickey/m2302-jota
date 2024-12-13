import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useF01 } from "../../hooks/jobs/useF01";
import { F01Context } from "./F01Context";

export const F01Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const f01 = useF01({ token: auth.token });

	return (
		<F01Context.Provider
			value={{
				...f01,
			}}>
			{children}
		</F01Context.Provider>
	);
};

F01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


