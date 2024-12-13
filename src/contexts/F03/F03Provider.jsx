import { useF03 } from "@/hooks/jobs/useF03";
import { F03Context } from "./F03Context";
import PropTypes from "prop-types";

export const F03Provider = ({ children }) => {
	const f03 = useF03();

	return (
		<F03Context.Provider
			value={{
				...f03,
			}}>
			{children}
		</F03Context.Provider>
	);
};

F03Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

