import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B04CustomerColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={5} {...rest} />
	);
};

B04CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04CustomerColumn.displayName = "B04CustomerColumn";
export default B04CustomerColumn;



