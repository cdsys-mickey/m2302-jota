import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} lg={3} md={4} sm={4} xs={4} {...rest} />
	);
};

B011DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011DateColumn.displayName = "B011DateColumn";
export default B011DateColumn;

