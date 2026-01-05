import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E03DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} md={3.5} xs={3} {...rest} />
	);
};

E03DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03DateColumn.displayName = "E03DateColumn";
export default E03DateColumn;




