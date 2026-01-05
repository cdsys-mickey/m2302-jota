import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E01CustomerColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={7} sm={8} {...rest} />
	);
};

E01CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01CustomerColumn.displayName = "E01CustomerColumn";
export default E01CustomerColumn;


