import { useE01 } from "../../hooks/jobs/useE01";
import { E01Context } from "./E01Context";
import PropTypes from "prop-types";

export const E01Provider = ({ children }) => {
	const e01 = useE01();

	return (
		<E01Context.Provider
			value={{
				...e01,
			}}>
			{children}
		</E01Context.Provider>
	);
};

E01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};


