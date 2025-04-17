import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G02IdColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

G02IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02IdColumn.displayName = "G02IdColumn";
export default G02IdColumn;

