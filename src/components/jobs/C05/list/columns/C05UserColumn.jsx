import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C05UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

C05UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C05UserColumn.displayName = "C05UserColumn";
export default C05UserColumn;
