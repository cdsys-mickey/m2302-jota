import PropTypes from "prop-types";
import { useZA03 } from "@/hooks/modules/useZA03";
import { UsersContext } from "./UsersContext";

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
