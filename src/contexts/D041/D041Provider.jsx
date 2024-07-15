import { useD041 } from "@/hooks/jobs/useD041";
import { D041Context } from "./D041Context";
import PropTypes from "prop-types";

export const D041Provider = ({ children }) => {
	const d041 = useD041();

	return (
		<D041Context.Provider
			value={{
				...d041,
			}}>
			{children}
		</D041Context.Provider>
	);
};

D041Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
