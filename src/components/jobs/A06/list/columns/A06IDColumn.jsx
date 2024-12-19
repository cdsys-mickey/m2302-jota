import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A06IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

A06IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06IDColumn.displayName = "A06IDColumn";
export default A06IDColumn;
