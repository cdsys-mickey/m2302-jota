import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C05DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={4} sm={3} {...rest} />
	);
};

C05DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C05DateColumn.displayName = "C05DateColumn";
export default C05DateColumn;
