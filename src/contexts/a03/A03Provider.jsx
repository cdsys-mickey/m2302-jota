import PropTypes from "prop-types";
import { A03Context } from "./A03Context";
import { useToggle } from "@/shared-hooks/useToggle";

const A03Provider = (props) => {
	const { children } = props;
	const [lockRows, toggleLockRows] = useToggle(true);
	return (
		<A03Context.Provider value={{ lockRows, toggleLockRows }}>
			{children}
		</A03Context.Provider>
	);
};

A03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default A03Provider;
