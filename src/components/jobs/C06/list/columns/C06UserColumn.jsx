import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C06UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06UserColumn.displayName = "C06UserColumn";
export default C06UserColumn;
