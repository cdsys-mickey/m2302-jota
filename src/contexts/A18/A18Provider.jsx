import { useA18 } from "@/hooks/jobs/useA18";
import PropTypes from "prop-types";
import { A18Context } from "./A18Context";

export const A18Provider = ({ children }) => {
	const a18 = useA18();

	return (

		<A18Context.Provider
			value={{
				...a18,
			}}>
			{children}
		</A18Context.Provider>
	);
};

A18Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};
