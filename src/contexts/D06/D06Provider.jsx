import { useD06 } from "@/hooks/jobs/useD06";
import { D06Context } from "./D06Context";
import PropTypes from "prop-types";

export const D06Provider = ({ children }) => {
	const d06 = useD06();

	return (
		<D06Context.Provider
			value={{
				...d06,
			}}>
			{children}
		</D06Context.Provider>
	);
};

D06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
