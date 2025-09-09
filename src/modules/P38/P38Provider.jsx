import { useMemo } from "react";
import P38Context from "./P38Context";
import PropTypes from "prop-types";
import useP38 from "./useP38";

const P38Provider = ({ children, ...rest }) => {
	const p38 = useP38();
	const contextValue = useMemo(() => ({
		...p38,
		...rest
	}), [p38, rest])

	return (
		<P38Context.Provider value={contextValue}>
			{children}
		</P38Context.Provider>
	);
};

P38Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default P38Provider