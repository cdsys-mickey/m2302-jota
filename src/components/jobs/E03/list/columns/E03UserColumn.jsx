import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E03UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={4} {...rest} />
	);
};

E03UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03UserColumn.displayName = "E03UserColumn";
export default E03UserColumn;




