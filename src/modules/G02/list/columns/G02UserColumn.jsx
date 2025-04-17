import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G02UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5}  {...rest} />
	);
};

G02UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02UserColumn.displayName = "G02UserColumn";
export default G02UserColumn;

