import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E03FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn flex pr={1} xs={2} justifyContent="center" {...rest} />
	);
};

E03FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03FlagColumn.displayName = "E03FlagColumn";
export default E03FlagColumn;


