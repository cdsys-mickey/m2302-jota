import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C09DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={3} {...rest} />
	);
};

C09DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C09DateColumn.displayName = "C09DateColumn";
export default C09DateColumn;
