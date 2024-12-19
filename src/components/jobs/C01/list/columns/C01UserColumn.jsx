import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C01UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} />
	);
};

C01UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01UserColumn.displayName = "C01UserColumn";
export default C01UserColumn;
