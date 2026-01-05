import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D01DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D01DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D01DateColumn.displayName = "D01DateColumn";
export default D01DateColumn;

