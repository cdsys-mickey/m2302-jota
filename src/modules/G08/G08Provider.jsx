import PropTypes from "prop-types";
import { G08Context } from "./G08Context";
import { useG08 } from "./useG08";

export const G08Provider = ({ children }) => {
	const g08 = useG08();

	return (
		<G08Context.Provider
			value={{
				...g08,
			}}>
			{children}
		</G08Context.Provider>
	);
};

G08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


