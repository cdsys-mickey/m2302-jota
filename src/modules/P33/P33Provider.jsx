import PropTypes from "prop-types";
import { P33Context } from "./P33Context";
import { useP33 } from "./useP33";

export const P33Provider = (props) => {
	const { children } = props;
	const p33 = useP33();

	return (
		<P33Context.Provider
			value={{
				...p33,
			}}>
			{children}
		</P33Context.Provider>
	);
};

P33Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};




