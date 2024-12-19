import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B012CustomerColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn pr={1} xs={6} {...rest} />
	);
};

B012CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012CustomerColumn.displayName = "B012CustomerColumn";
export default B012CustomerColumn;


