import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G06NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={4} {...rest} />
	);
};

G06NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G06NameColumn.displayName = "G06NameColumn";
export default G06NameColumn;

