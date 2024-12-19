import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C09IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C09IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09IdColumn.displayName = "C09IdColumn";
export default C09IdColumn;
