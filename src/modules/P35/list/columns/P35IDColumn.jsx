import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P35IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

P35IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P35IDColumn.displayName = "P35IDColumn";
export default P35IDColumn;


