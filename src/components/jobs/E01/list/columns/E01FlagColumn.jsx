import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E01FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn flex pr={1} xs={2} justifyContent="center" {...rest} />
	);
};

E01FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E01FlagColumn.displayName = "E01FlagColumn";
export default E01FlagColumn;
