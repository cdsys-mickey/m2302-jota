import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const D02DeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

D02DeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02DeptColumn.displayName = "D02DeptColumn";
export default D02DeptColumn;


