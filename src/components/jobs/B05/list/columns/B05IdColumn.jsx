import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B05IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

B05IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B05IdColumn.displayName = "B05IdColumn";
export default B05IdColumn;
