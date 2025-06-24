import PropTypes from "prop-types";
import { P32Context } from "./P32Context";
import { useP32 } from "./useP32";

export const P32Provider = (props) => {
	const { children } = props;
	const p32 = useP32();

	return (
		<P32Context.Provider
			value={{
				...p32,
			}}>
			{children}
		</P32Context.Provider>
	);
};

P32Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



