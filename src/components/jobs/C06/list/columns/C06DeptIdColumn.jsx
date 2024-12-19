import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06DeptIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={2} {...rest} />
	);
};

C06DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06DeptIdColumn.displayName = "C06DeptIdColumn";
export default C06DeptIdColumn;
