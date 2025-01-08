import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A06NameColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={8} {...rest} />
	);
};

A06NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06NameColumn.displayName = "A06NameColumn";
export default A06NameColumn;
