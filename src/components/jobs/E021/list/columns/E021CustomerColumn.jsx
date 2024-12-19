import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const E021CustomerColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={8} {...rest} />
	);
};

E021CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021CustomerColumn.displayName = "E021CustomerColumn";
export default E021CustomerColumn;



