import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04SpNameColumn = (props) => {
	const { expChecking, ...rest } = props;

	return (
		<ListColumn
			pr={1}
			md={expChecking ? 3 : 5}
			xs={expChecking ? 4 : 6}
			{...rest} />
	);
};

C04SpNameColumn.propTypes = {
	loading: PropTypes.bool,
	expChecking: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04SpNameColumn.displayName = "C04DeptNameColumn";
export default C04SpNameColumn;
