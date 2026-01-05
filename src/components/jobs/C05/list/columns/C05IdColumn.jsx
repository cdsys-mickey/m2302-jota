import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C05IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={4} sm={3} {...rest} />
	);
};

C05IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C05IdColumn.displayName = "C05IdColumn";
export default C05IdColumn;
