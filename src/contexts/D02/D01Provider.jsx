import { useD01 } from "../../hooks/jobs/useD01";
import { D01Context } from "./D01Context";
import PropTypes from "prop-types";

export const D01Provider = ({ children }) => {
	const d01 = useD01();

	return (
		<D01Context.Provider
			value={{
				...d01,
			}}>
			{children}
		</D01Context.Provider>
	);
};

D01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
