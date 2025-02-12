import PropTypes from "prop-types";
import { useJobMenu } from "./useJobMenu";
import { JobMenuContext } from "./JobMenuContext";

export const JobMenuProvider = ({ children }) => {
	const jobMenu = useJobMenu();

	return (
		<JobMenuContext.Provider
			value={{
				...jobMenu,
			}}>
			{children}
		</JobMenuContext.Provider>
	);
};

JobMenuProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
