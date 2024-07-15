import { useD07 } from "@/hooks/jobs/useD07";
import { D07Context } from "./D07Context";
import PropTypes from "prop-types";

export const D07Provider = ({ children }) => {
	const d07 = useD07();

	return (
		<D07Context.Provider
			value={{
				...d07,
			}}>
			{children}
		</D07Context.Provider>
	);
};

D07Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
