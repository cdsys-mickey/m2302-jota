import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B012PriceColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B012PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012PriceColumn.displayName = "B012PriceColumn";
export default B012PriceColumn;


