import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={3} {...rest} />
	);
};

P41DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41DateColumn.displayName = "P41DateColumn";
export default P41DateColumn;



