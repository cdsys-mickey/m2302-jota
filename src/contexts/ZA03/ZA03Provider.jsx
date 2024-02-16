import PropTypes from "prop-types";
import { useZA03 } from "@/hooks/modules/useZA03";
import { ZA03Context } from "./ZA03Context";

export const ZA03Provider = ({ children }) => {
	const za03 = useZA03();

	return (
		<ZA03Context.Provider
			value={{
				...za03,
			}}>
			{children}
		</ZA03Context.Provider>
	);
};

ZA03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
