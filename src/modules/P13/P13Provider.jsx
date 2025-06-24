import PropTypes from "prop-types";
import { P13Context } from "./P13Context";
import { useP13 } from "./useP13";

export const P13Provider = (props) => {
	const { children } = props;
	const p13 = useP13();

	return (
		<P13Context.Provider
			value={{
				...p13,
			}}>
			{children}
		</P13Context.Provider>
	);
};

P13Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

