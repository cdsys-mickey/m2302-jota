import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E021IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

E021IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021IdColumn.displayName = "E021IdColumn";
export default E021IdColumn;



