import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B011DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011DateColumn.displayName = "B011DateColumn";
export default B011DateColumn;

