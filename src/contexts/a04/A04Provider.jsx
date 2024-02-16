import PropTypes from "prop-types";
import { useA04 } from "../../hooks/modules/useA04";
import { A04Context } from "./A04Context";

export const A04Provider = (props) => {
	const { children } = props;
	const a04 = useA04();

	return (
		<A04Context.Provider
			value={{
				...a04,
			}}>
			{children}
		</A04Context.Provider>
	);
};

A04Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
