import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41CmsColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} md={3} sm={3} {...rest} />
	);
};

P41CmsColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41CmsColumn.displayName = "P41CmsColumn";
export default P41CmsColumn;



