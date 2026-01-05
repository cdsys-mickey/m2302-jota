import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D06UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={5} sm={4} {...rest} />
	);
};

D06UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06UserColumn.displayName = "D06UserColumn";
export default D06UserColumn;
