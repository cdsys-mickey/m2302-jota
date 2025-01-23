import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A05IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

A05IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A05IDColumn.displayName = "A05IDColumn";
export default A05IDColumn;
