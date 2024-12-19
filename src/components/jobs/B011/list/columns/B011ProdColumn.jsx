import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011ProdColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} {...rest} />
	);
};

B011ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011ProdColumn.displayName = "B011ProdColumn";
export default B011ProdColumn;

