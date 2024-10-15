import { useE03 } from "../../hooks/jobs/useE03";
import { E03Context } from "./E03Context";
import PropTypes from "prop-types";

export const E03Provider = ({ children }) => {
	const e03 = useE03();

	return (
		<E03Context.Provider
			value={{
				...e03,
			}}>
			{children}
		</E03Context.Provider>
	);
};

E03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};




