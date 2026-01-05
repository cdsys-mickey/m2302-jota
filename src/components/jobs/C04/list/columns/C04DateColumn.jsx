import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} lg={3} md={3.5} {...rest} />
	);
};

C04DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04DateColumn.displayName = "C04DateColumn";
export default C04DateColumn;
