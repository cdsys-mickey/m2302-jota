import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B012ProdColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={7} {...rest} />
	);
};

B012ProdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012ProdColumn.displayName = "B012ProdColumn";
export default B012ProdColumn;


