import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06DeptNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			item
			pr={1}
			md={5}
			sm={4}
			{...rest}
		/>
	);
};

C06DeptNameColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06DeptNameColumn.displayName = "C06DeptNameColumn";
export default C06DeptNameColumn;
