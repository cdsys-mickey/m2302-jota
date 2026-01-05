import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07DeptIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={3} sm={2} {...rest} />
	);
};

C07DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C07DeptIdColumn.displayName = "C07DeptIdColumn";
export default C07DeptIdColumn;
