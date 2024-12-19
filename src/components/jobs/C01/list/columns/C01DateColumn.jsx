import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C01DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

C01DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C01DateColumn.displayName = "C01DateColumn";
export default C01DateColumn;
