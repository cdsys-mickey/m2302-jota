import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C08DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={3.5} sm={3} {...rest} />
	);
};

C08DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C08DateColumn.displayName = "C08DateColumn";
export default C08DateColumn;
