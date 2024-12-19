import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C09UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

C09UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09UserColumn.displayName = "C09UserColumn";
export default C09UserColumn;
