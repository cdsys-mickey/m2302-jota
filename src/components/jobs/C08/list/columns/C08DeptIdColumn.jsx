import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C08DeptIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={3} sm={2} {...rest} />
	);
};

C08DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C08DeptIdColumn.displayName = "C08DeptIdColumn";
export default C08DeptIdColumn;
