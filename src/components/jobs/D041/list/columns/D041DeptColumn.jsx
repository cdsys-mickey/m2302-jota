import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D041DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={5} {...rest} />
	);
};

D041DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D041DeptColumn.displayName = "D041DeptColumn";
export default D041DeptColumn;
