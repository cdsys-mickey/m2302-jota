import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C03DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={8} {...rest} />
	);
};

C03DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03DeptColumn.displayName = "C03DeptColumn";
export default C03DeptColumn;
