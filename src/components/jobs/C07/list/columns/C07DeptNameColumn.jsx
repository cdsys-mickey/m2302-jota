import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07DeptNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			pr={1}
			md={4.5}
			sm={4}
			{...rest}
		/>
	);
};

C07DeptNameColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C07DeptNameColumn.displayName = "C07DeptNameColumn";
export default C07DeptNameColumn;
