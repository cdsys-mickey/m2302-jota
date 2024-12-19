import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B02PriceColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B02PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02PriceColumn.displayName = "B02PriceColumn";
export default B02PriceColumn;


