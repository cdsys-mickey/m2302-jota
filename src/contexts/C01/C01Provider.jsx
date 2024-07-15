import { useC01 } from "@/hooks/jobs/useC01";
import { C01Context } from "./C01Context";
import PropTypes from "prop-types";

export const C01Provider = ({ children }) => {
	const c01 = useC01();

	return (
		<C01Context.Provider
			value={{
				...c01,
			}}>
			{children}
		</C01Context.Provider>
	);
};

C01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
