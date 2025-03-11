import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E021FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn flex pr={1} xs={2} justifyContent="center" {...rest} />
	);
};

E021FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021FlagColumn.displayName = "E021FlagColumn";
export default E021FlagColumn;

