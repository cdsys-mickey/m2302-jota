import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E03CustomerColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={8} {...rest} />
	);
};

E03CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E03CustomerColumn.displayName = "E03CustomerColumn";
export default E03CustomerColumn;




