import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E01DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} sm={3} md={4} {...rest} />
	);
};

E01DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01DateColumn.displayName = "E01DateColumn";
export default E01DateColumn;


