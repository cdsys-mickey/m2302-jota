import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D05UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

D05UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D05UserColumn.displayName = "D05UserColumn";
export default D05UserColumn;

