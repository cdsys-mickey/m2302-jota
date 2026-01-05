import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D041IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D041IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D041IdColumn.displayName = "D041IdColumn";
export default D041IdColumn;



