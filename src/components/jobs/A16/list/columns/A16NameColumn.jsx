import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A16NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} {...rest} />
	);
};

A16NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A16NameColumn.displayName = "A16NameColumn";
export default A16NameColumn;

