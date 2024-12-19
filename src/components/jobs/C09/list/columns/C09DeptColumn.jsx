import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C09DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={5} {...rest} />
	);
};

C09DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09DeptColumn.displayName = "C09DeptColumn";
export default C09DeptColumn;
