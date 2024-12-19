import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C05DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sm={9} md={9} lg={9} {...rest} />
	);
};

C05DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C05DeptColumn.displayName = "C05DeptColumn";
export default C05DeptColumn;
