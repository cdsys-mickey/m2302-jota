import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06ProdIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

B06ProdIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06ProdIdColumn.displayName = "B06ProdIdColumn";
export default B06ProdIdColumn;
