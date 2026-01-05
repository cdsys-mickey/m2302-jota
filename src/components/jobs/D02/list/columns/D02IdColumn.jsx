import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D02IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

D02IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02IdColumn.displayName = "D02IdColumn";
export default D02IdColumn;


