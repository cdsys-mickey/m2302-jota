import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C08DeptNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			pr={1}
			xs={4}
			{...rest}
		/>
	);
};

C08DeptNameColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C08DeptNameColumn.displayName = "C08DeptNameColumn";
export default C08DeptNameColumn;
