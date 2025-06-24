import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P34NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P34NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P34NameColumn.displayName = "P34NameColumn";
export default P34NameColumn;

