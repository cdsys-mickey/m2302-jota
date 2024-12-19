import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

C07IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C07IdColumn.displayName = "C07IdColumn";
export default C07IdColumn;
