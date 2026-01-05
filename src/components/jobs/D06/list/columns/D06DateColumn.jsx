import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D06DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D06DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06DateColumn.displayName = "D06DateColumn";
export default D06DateColumn;



