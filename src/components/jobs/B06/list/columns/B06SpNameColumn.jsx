import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06SpNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={3.5} xs={4} {...rest} />
	);
};

B06SpNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06SpNameColumn.displayName = "B06SpNameColumn";
export default B06SpNameColumn;
