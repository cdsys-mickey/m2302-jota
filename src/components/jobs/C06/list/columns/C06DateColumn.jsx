import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={3.5} xs={3} {...rest} />
	);
};

C06DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06DateColumn.displayName = "C06DateColumn";
export default C06DateColumn;
