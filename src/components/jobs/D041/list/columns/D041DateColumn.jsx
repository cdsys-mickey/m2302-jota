import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D041DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

D041DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D041DateColumn.displayName = "D041DateColumn";
export default D041DateColumn;



