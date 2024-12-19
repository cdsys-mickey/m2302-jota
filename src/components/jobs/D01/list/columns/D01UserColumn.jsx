import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D01UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D01UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D01UserColumn.displayName = "D01UserColumn";
export default D01UserColumn;

