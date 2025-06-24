import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P36NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P36NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P36NameColumn.displayName = "P36NameColumn";
export default P36NameColumn;



