import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04DeptNameColumn = (props) => {
	const { expChecking, ...rest } = props;

	return (
		<ListColumn
			pr={1}
			xs={expChecking ? 4 : 6}
			{...rest} />
	);
};

C04DeptNameColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04DeptNameColumn.displayName = "C04DeptNameColumn";
export default C04DeptNameColumn;
