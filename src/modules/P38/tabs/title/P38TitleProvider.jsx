import P38TitleContext from "./P38TitleContext";
import PropTypes from "prop-types";
import useP38Title from "./useP38Title";
import { useMemo } from "react";

const P38TitleProvider = ({ children, ...rest }) => {
	const p38Title = useP38Title();

	const contextValue = useMemo(() => ({
		...p38Title
	}), [p38Title])

	return (
		<P38TitleContext.Provider
			value={{
				...contextValue,
				...rest
			}}>
			{children}
		</P38TitleContext.Provider>
	);
};

P38TitleProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}
export default P38TitleProvider
