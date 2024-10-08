import PropTypes from "prop-types";
import { useZA03 } from "@/hooks/jobs/useZA03";
import { UsersContext } from "./ZA03Context";

export const UsersProvider = ({ children }) => {
	const za03 = useZA03();

	return (
		<UsersContext.Provider
			value={{
				...za03,
			}}>
			{children}
		</UsersContext.Provider>
	);
};

UsersProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
