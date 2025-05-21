import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A16Name2Column = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={6} {...rest} />
	);
};

A16Name2Column.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A16Name2Column.displayName = "A16Name2Column";
export default A16Name2Column;

