import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C08IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C08IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C08IdColumn.displayName = "C08IdColumn";
export default C08IdColumn;
