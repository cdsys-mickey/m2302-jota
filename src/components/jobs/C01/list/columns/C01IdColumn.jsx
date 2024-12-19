import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C01IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

C01IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01IdColumn.displayName = "C01IdColumn";
export default C01IdColumn;
