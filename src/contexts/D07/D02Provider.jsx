import { useD02 } from "../../hooks/jobs/useD02";
import { D02Context } from "./D02Context";
import PropTypes from "prop-types";

export const D02Provider = ({ children }) => {
	const d02 = useD02();

	return (
		<D02Context.Provider
			value={{
				...d02,
			}}>
			{children}
		</D02Context.Provider>
	);
};

D02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
