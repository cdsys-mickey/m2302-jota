import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C06FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={1} {...rest} />
	);
};

C06FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C06FlagColumn.displayName = "C06FlagColumn";
export default C06FlagColumn;
