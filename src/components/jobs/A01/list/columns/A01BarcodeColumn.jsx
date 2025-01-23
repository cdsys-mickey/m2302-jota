import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A01BarcodeColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }}{...rest} />
	);
};

A01BarcodeColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01BarcodeColumn.displayName = "A01BarcodeColumn";
export default A01BarcodeColumn;
