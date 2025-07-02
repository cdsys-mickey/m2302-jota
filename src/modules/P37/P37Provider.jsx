import P37Context from "./P37Context";
import PropTypes from "prop-types";
import useP37 from "./useP37";

const P37Provider = ({ children, ...rest }) => {
	const p37 = useP37();


	return (
		<P37Context.Provider
			value={{
				...p37,
				...rest
			}}>
			{children}
		</P37Context.Provider>
	);
};

P37Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default P37Provider