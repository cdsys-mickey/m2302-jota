import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

P42IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42IDColumn.displayName = "P42IDColumn";
export default P42IDColumn;



