import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B04PriceColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={3} {...rest} />
	);
};

B04PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B04PriceColumn.displayName = "B04PriceColumn";
export default B04PriceColumn;



