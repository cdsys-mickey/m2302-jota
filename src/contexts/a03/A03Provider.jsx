import PropTypes from "prop-types";
import { A03Context } from "./A03Context";
import { useA03 } from "../../hooks/jobs/useA03";

export const A03Provider = (props) => {
	const { children } = props;
	const a03 = useA03();

	return (
		<A03Context.Provider value={{ ...a03 }}>{children}</A03Context.Provider>
	);
};

A03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
