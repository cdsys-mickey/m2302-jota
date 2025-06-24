import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P34IDColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn item pr={1} xs={6} sm={4} {...rest} />
	);
};

P34IDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P34IDColumn.displayName = "P34IDColumn";
export default P34IDColumn;

