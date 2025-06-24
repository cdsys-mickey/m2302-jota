import PropTypes from "prop-types";
import { P31Context } from "./P31Context";
import { useP31 } from "./useP31";

export const P31Provider = (props) => {
	const { children } = props;
	const p31 = useP31();

	return (
		<P31Context.Provider
			value={{
				...p31,
			}}>
			{children}
		</P31Context.Provider>
	);
};

P31Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


