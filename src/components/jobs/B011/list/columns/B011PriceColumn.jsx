import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011PriceColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B011PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011PriceColumn.displayName = "B011PriceColumn";
export default B011PriceColumn;

