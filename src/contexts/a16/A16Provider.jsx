import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useA16 } from "../../hooks/modules/useA16";
import { A16Context } from "./A16Context";

export const A16Provider = (props) => {
	const { children } = props;
	// const [lockRows, toggleLockRows] = useToggle(true);
	const { token } = useContext(AuthContext);
	const a16 = useA16({ token });

	useInit(() => {
		a16.load();
	}, []);

	return (
		<A16Context.Provider
			value={{
				...a16,
			}}>
			{children}
		</A16Context.Provider>
	);
};

A16Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
