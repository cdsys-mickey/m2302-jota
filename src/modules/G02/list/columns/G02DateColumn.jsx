import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G02DateColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

G02DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02DateColumn.displayName = "G02DateColumn";
export default G02DateColumn;

