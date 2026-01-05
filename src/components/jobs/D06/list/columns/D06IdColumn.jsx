import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D06IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D06IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06IdColumn.displayName = "D06IdColumn";
export default D06IdColumn;



