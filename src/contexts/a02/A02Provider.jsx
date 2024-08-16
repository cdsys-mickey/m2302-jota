import PropTypes from "prop-types";
import { useA02 } from "../../hooks/jobs/useA02";
import { A02Context } from "./A02Context";

export const A02Provider = (props) => {
	const { children } = props;
	const a02 = useA02();

	return (
		<A02Context.Provider
			value={{
				...a02,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
