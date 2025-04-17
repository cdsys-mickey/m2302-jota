import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B05UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5}  {...rest} />
	);
};

B05UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B05UserColumn.displayName = "B05UserColumn";
export default B05UserColumn;
