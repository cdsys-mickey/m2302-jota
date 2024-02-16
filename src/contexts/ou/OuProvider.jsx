import { OuContext } from "./OuContext";
import PropTypes from "prop-types";
import { useZA03 } from "@/hooks/useZA03";

export const OuProvider = ({ children }) => {
	const za03 = useZA03();

	return (
		<OuContext.Provider
			value={{
				...za03,
			}}>
			{children}
		</OuContext.Provider>
	);
};

OuProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
