import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C01DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

C01DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01DeptColumn.displayName = "C01DeptColumn";
export default C01DeptColumn;
