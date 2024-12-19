import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

C04UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04UserColumn.displayName = "C04UserColumn";
export default C04UserColumn;
