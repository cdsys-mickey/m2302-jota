import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E021DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

E021DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021DateColumn.displayName = "E021DateColumn";
export default E021DateColumn;



