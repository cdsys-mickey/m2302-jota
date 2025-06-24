import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P41NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41NameColumn.displayName = "P41NameColumn";
export default P41NameColumn;



