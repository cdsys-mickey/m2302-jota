import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B04UserColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={3} {...rest} />
	);
};

B04UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04UserColumn.displayName = "B04UserColumn";
export default B04UserColumn;



