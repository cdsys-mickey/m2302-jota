import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G06YMColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={2} {...rest} />
	);
};

G06YMColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G06YMColumn.displayName = "G06YMColumn";
export default G06YMColumn;

