import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E01IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

E01IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01IdColumn.displayName = "E01IdColumn";
export default E01IdColumn;


