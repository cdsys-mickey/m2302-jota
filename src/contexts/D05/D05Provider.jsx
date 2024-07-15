import { useD05 } from "@/hooks/jobs/useD05";
import { D05Context } from "./D05Context";
import PropTypes from "prop-types";

export const D05Provider = ({ children }) => {
	const d05 = useD05();

	return (
		<D05Context.Provider
			value={{
				...d05,
			}}>
			{children}
		</D05Context.Provider>
	);
};

D05Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
