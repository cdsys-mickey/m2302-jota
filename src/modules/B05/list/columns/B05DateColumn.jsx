import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B05DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

B05DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B05DateColumn.displayName = "B05DateColumn";
export default B05DateColumn;
