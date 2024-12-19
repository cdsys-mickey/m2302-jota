import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C03UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} />
	);
};

C03UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03UserColumn.displayName = "C03UserColumn";
export default C03UserColumn;
