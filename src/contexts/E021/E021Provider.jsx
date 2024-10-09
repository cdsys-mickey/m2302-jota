import { useE021 } from "../../hooks/jobs/useE021";
import { E021Context } from "./E021Context";
import PropTypes from "prop-types";

export const E021Provider = ({ children }) => {
	const e021 = useE021();

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



