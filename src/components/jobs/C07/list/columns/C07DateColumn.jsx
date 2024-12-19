import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C07DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C07DateColumn.displayName = "C07DateColumn";
export default C07DateColumn;
