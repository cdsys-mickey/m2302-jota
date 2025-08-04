import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41FlagColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={2} sm={1.5} {...rest} />
	);
};

P41FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41FlagColumn.displayName = "P41FlagColumn";
export default P41FlagColumn;



