import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useP16 } from "../../hooks/jobs/useP16";
import { P16Context } from "./P16Context";

export const P16Provider = (props) => {
	const { children } = props;
	const auth = useContext(AuthContext);
	const p16 = useP16({ token: auth.token });

	return (
		<P16Context.Provider
			value={{
				...p16,
			}}>
			{children}
		</P16Context.Provider>
	);
};

P16Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

