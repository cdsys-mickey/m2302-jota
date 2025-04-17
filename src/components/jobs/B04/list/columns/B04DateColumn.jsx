import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B04DateColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={3} {...rest} />
	);
};

B04DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04DateColumn.displayName = "B04DateColumn";
export default B04DateColumn;



