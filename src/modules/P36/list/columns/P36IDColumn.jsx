import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P36IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

P36IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P36IDColumn.displayName = "P36IDColumn";
export default P36IDColumn;



