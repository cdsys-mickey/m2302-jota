import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B06InqIdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} md={4} xs={3} {...rest} />
	);
};

B06InqIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06InqIdColumn.displayName = "B06InqIdColumn";
export default B06InqIdColumn;
