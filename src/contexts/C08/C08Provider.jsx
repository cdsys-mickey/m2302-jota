import { useC08 } from "@/hooks/jobs/useC08";
import { C08Context } from "./C08Context";
import PropTypes from "prop-types";

export const C08Provider = ({ children }) => {
	const c08 = useC08();

	return (
		<C08Context.Provider
			value={{
				...c08,
			}}>
			{children}
		</C08Context.Provider>
	);
};

C08Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
