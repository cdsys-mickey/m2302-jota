import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A20NameColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={9}{...rest} />
	);
};

A20NameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A20NameColumn.displayName = "A20NameColumn";
export default A20NameColumn;
