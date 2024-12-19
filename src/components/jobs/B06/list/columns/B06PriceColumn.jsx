import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06PriceColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			flex
			pr={1}
			xs={3}
			justifyContent="flex-end"
			{...rest}
		/>
	);
};

B06PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06PriceColumn.displayName = "B06PriceColumn";
export default B06PriceColumn;
