import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D05DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D05DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D05DateColumn.displayName = "D05DateColumn";
export default D05DateColumn;

