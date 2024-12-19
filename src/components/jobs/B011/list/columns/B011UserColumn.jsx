import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B011UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011UserColumn.displayName = "B011UserColumn";
export default B011UserColumn;

