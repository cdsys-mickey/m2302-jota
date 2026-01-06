import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42GroupNameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} md={4.5} sm={6} {...rest} />
	);
};

P42GroupNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42GroupNameColumn.displayName = "P42NameColumn";
export default P42GroupNameColumn;




