import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B02UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B02UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02UserColumn.displayName = "B02UserColumn";
export default B02UserColumn;


