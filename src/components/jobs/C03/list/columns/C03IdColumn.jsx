import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C03IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

C03IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03IdColumn.displayName = "C03IdColumn";
export default C03IdColumn;
