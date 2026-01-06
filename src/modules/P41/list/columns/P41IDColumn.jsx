import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} md={4} sm={3} {...rest} />
	);
};

P41IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41IDColumn.displayName = "P41IDColumn";
export default P41IDColumn;



