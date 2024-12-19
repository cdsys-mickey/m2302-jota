import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B012UserColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B012UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012UserColumn.displayName = "B012UserColumn";
export default B012UserColumn;


