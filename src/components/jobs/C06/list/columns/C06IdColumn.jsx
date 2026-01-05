import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={4} sm={3} {...rest} />
	);
};

C06IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06IdColumn.displayName = "C06IdColumn";
export default C06IdColumn;
