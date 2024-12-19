import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06ProdNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={6} {...rest} />
	);
};

B06ProdNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06ProdNameColumn.displayName = "B06ProdNameColumn";
export default B06ProdNameColumn;
