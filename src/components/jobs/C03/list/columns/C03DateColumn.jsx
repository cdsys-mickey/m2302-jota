import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C03DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={4} {...rest} />
	);
};

C03DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C03DateColumn.displayName = "C03DateColumn";
export default C03DateColumn;
