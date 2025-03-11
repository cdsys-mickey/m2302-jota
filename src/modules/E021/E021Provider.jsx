import { E021Context } from "./E021Context";
import PropTypes from "prop-types";
import { useE021 } from "./useE021";
import E021 from "./E021.mjs";

export const E021Provider = ({ children }) => {
	const e021 = useE021({
		mode: E021.Mode.MANAGER
	});

	return (
		<E021Context.Provider
			value={{
				...e021,
			}}>
			{children}
		</E021Context.Provider>
	);
};

E021Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



