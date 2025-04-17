import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B04ProdColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={6} {...rest} />
	);
};

B04ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04ProdColumn.displayName = "B04ProdColumn";
export default B04ProdColumn;



