import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C04NumColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={2} {...rest} />
	);
};

C04NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C04NumColumn.displayName = "C04NumColumn";
export default C04NumColumn;
