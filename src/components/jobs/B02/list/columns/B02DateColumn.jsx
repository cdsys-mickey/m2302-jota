import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B02DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={4} xs={3}  {...rest} />
	);
};

B02DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B02DateColumn.displayName = "B02DateColumn";
export default B02DateColumn;


