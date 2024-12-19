import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D01DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

D01DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D01DeptColumn.displayName = "D01DeptColumn";
export default D01DeptColumn;

