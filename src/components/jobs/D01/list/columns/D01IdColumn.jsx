import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D01IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D01IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D01IdColumn.displayName = "D01IdColumn";
export default D01IdColumn;

