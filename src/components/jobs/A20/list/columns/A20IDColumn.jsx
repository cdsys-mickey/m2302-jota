import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A20IDColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

A20IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A20IDColumn.displayName = "A20IDColumn";
export default A20IDColumn;
