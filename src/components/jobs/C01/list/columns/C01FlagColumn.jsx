import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C01FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={1} {...rest} />
	);
};

C01FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01FlagColumn.displayName = "C01FlagColumn";
export default C01FlagColumn;
