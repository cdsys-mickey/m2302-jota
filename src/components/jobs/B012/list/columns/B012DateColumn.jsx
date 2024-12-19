import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B012DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

B012DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012DateColumn.displayName = "B012DateColumn";
export default B012DateColumn;


