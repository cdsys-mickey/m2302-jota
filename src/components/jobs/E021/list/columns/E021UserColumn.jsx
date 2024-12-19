import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E021UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={4} {...rest} />
	);
};

E021UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021UserColumn.displayName = "E021UserColumn";
export default E021UserColumn;



