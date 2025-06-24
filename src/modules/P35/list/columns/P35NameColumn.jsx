import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P35NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P35NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P35NameColumn.displayName = "P35NameColumn";
export default P35NameColumn;


