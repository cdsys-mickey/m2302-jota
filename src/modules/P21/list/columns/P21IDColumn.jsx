import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P21IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

P21IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P21IDColumn.displayName = "P21IDColumn";
export default P21IDColumn;


