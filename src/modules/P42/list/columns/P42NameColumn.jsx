import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={9} {...rest} />
	);
};

P42NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42NameColumn.displayName = "P42NameColumn";
export default P42NameColumn;



