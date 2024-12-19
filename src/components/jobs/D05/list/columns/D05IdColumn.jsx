import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D05IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D05IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D05IdColumn.displayName = "D05IdColumn";
export default D05IdColumn;

