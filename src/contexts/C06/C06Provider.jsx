import { useC06 } from "@/hooks/jobs/useC06";
import { C06Context } from "./C06Context";
import PropTypes from "prop-types";

export const C06Provider = ({ children }) => {
	const c06 = useC06();

	return (
		<C06Context.Provider
			value={{
				...c06,
			}}>
			{children}
		</C06Context.Provider>
	);
};

C06Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
