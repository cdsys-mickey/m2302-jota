import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P21NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P21NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P21NameColumn.displayName = "P21NameColumn";
export default P21NameColumn;


