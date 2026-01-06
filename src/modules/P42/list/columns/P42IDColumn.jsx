import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} md={4} sm={6}{...rest} />
	);
};

P42IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42IDColumn.displayName = "P42IDColumn";
export default P42IDColumn;




