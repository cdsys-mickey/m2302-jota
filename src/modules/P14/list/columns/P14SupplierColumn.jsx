import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P14SupplierColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sm={9} md={9} lg={10} {...rest} />
	);
};

P14SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P14SupplierColumn.displayName = "P14SupplierColumn";
export default P14SupplierColumn;


