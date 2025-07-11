import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={17} sm={3} {...rest} />
	);
};

P42DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42DateColumn.displayName = "P42DateColumn";
export default P42DateColumn;




