import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B02CustomerColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={5} {...rest} />
	);
};

B02CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02CustomerColumn.displayName = "B02CustomerColumn";
export default B02CustomerColumn;


