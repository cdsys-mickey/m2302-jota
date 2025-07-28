import P37XContext from "./P37XContext";
import PropTypes from "prop-types";
import useP37X from "./useP37X";

const P37XProvider = ({ children, ...rest }) => {
	const p37x = useP37X();


	return (
		<P37XContext.Provider
			value={{
				...p37x,
				...rest
			}}>
			{children}
		</P37XContext.Provider>
	);
};

P37XProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default P37XProvider
