import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P14IdColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={4} sm={4} md={4} lg={4} {...rest} />
	);
};

P14IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P14IdColumn.displayName = "P14IdColumn";
export default P14IdColumn;


