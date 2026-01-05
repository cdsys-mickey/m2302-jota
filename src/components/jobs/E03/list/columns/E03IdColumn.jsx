import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E03IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

E03IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03IdColumn.displayName = "E03IdColumn";
export default E03IdColumn;




