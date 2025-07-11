import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42GuideNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={3} {...rest} />
	);
};

P42GuideNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42GuideNameColumn.displayName = "P42GuideNameColumn";
export default P42GuideNameColumn;




