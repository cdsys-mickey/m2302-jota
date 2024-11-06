import { ListRowContext } from "./ListRowContext";
import PropTypes from "prop-types";

export const ListRowProvider = ({ children, ...rest }) => {

	return (
		<ListRowContext.Provider
			value={{
				...rest
			}}>
			{children}
		</ListRowContext.Provider>
	);
};

ListRowProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}