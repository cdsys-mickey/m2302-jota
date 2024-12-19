import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D02UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D02UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02UserColumn.displayName = "D02UserColumn";
export default D02UserColumn;


