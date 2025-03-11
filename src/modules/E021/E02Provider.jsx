import { E021Context } from "./E021Context";
import PropTypes from "prop-types";
import { useE021 } from "./useE021";
import E021 from "./E021.mjs";

export const E02Provider = ({ children }) => {
	const e021 = useE021({
		mode: E021.Mode.CLEARK
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

E02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};



