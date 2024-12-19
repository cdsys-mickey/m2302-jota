import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B02ProdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} {...rest} />
	);
};

B02ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02ProdColumn.displayName = "B02ProdColumn";
export default B02ProdColumn;


