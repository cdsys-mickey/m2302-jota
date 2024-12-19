import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

C04IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04IdColumn.displayName = "C04IdColumn";
export default C04IdColumn;
