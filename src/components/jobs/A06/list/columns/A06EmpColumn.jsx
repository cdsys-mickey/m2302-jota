import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A06EmpColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

A06EmpColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06EmpColumn.displayName = "A06EmpColumn";
export default A06EmpColumn;
