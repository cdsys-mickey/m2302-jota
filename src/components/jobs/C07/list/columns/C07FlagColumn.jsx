import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C07FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={1} {...rest} />
	);
};

C07FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

C07FlagColumn.displayName = "C07FlagColumn";
export default C07FlagColumn;
