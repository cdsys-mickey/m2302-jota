import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41GuideNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={3} {...rest} />
	);
};

P41GuideNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41GuideNameColumn.displayName = "P41GuideNameColumn";
export default P41GuideNameColumn;



