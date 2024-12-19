import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C07UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C07UserColumn.displayName = "C07UserColumn";
export default C07UserColumn;
