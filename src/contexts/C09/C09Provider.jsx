import { useC09 } from "@/hooks/modules/useC09";
import { C09Context } from "./C09Context";
import PropTypes from "prop-types";

export const C09Provider = ({ children }) => {
	const c09 = useC09();

	return (
		<C09Context.Provider
			value={{
				...c09,
			}}>
			{children}
		</C09Context.Provider>
	);
};

C09Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
