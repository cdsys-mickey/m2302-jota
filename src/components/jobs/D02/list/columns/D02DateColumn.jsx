import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D02DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D02DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02DateColumn.displayName = "D02DateColumn";
export default D02DateColumn;


