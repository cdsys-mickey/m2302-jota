import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A05NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

A05NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A05NameColumn.displayName = "A05NameColumn";
export default A05NameColumn;
