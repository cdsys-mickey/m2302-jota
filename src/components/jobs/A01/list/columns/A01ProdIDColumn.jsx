import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A01ProdIDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4}  {...rest} />
	);
};

A01ProdIDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ProdIDColumn.displayName = "A01ProdIDColumn";
export default A01ProdIDColumn;
