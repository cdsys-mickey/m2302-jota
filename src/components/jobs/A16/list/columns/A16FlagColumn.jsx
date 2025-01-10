import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A16FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} />
	);
};

A16FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A16FlagColumn.displayName = "A16FlagColumn";
export default A16FlagColumn;

