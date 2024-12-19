import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04DeptIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={2} {...rest} />
	);
};

C04DeptIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04DeptIdColumn.displayName = "C04DeptIdColumn";
export default C04DeptIdColumn;
