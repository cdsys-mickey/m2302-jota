import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={4} xs={3} {...rest} />
	);
};

B06DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06DateColumn.displayName = "B06DateColumn";
export default B06DateColumn;
