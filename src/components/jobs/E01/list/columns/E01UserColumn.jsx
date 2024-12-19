import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E01UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={4} {...rest} />
	);
};

E01UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01UserColumn.displayName = "E01UserColumn";
export default E01UserColumn;


