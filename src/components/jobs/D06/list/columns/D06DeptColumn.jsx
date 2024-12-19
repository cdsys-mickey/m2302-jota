import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D06DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={5} {...rest} />
	);
};

D06DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D06DeptColumn.displayName = "D06DeptColumn";
export default D06DeptColumn;
